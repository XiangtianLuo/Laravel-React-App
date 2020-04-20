<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Task;
use App\Item;

class TaskController extends Controller
{

    public function __construct(){
        $this->middleware('auth');
    }

    public function index(Request $request,Task $task, Item $item)
    {
        if($request->get('targeted_item_name')){ // examine the GET request first and respond differently
            $target_item_name = $request->get('targeted_item_name');
            $target_item = $item->where('name',$target_item_name)->first();
            $tasks = $target_item->tasks()->get();
            return response()->json([
                'tasks'=>$tasks,
            ]);
        }

        else {
            $allItems = $item->select('name')->get();// just fetch the 'name' column from item model 
            $allTasks = $task->whereIn('user_id', $request->user())->with('user');
            $tasks = $allTasks->orderBy('created_at','desc')->take(500)->get();
            return response()->json([
                'tasks'=>$tasks,
                'itemList'=>$allItems,
            ]);
        }
    }

    public function create()
    {
        //
    }

    public function store(Request $request, Item $item)
    {
        $this->validate($request,[
            'trackingNumber' => 'required|max:255',
        ]);
        $task = $request->user()->tasks()->create([
            'customer_name' => $request -> customer_name,
            'trackingNumber' => $request -> trackingNumber,
            'description' =>  $request -> orderDescription_string,//I tried laravel implode('key',',')method but found I'd better stringfy the orderDescription at the front-end
            'freightCompany'=> $request-> freightCompany
        ]);
        foreach($request-> orderDescription as $each_item_description){
            $Current_Item_Index =  $item->where('name', $each_item_description['name'])->first()->id;
            $task->items()->attach($Current_Item_Index,['quantity'=> $each_item_description['quantity']]);//I take advantage of the intermediate table to attach the ManytoMany relationship, and insert the 'quantity' of the item
        }//The '->' will only apply for laravel database model, for $each_item_description Obejct, use traditional PHP to get attribute of 'name'
        return response()->json($task->with('user')->find($task->id));//we need the new task!!
    } 

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $task = Task::findOrFail($id);
        return response()->json([
            'task' => $task,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $task = Task::findOrFail($id);
        $task->update($input);
        return response()->json($task->with('user')->find($task->id));
    }

    public function destroy($id)
    {   
        $task = Task::findOrFail($id);
        $task->items()->wherePivot('task_id','=',$task->id)->detach();// do not apply SoftDelete, instead, I deleted the data from the intermediate table by calling detach
        $task->forceDelete();
        return response()->json();
    }
}
