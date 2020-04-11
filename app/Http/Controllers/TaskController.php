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
        //The following code indicates 
        //$target_item = $item->find(1);
        //$tasks = $target_item->tasks()->get();
        //$totalNumber = 0;
        //foreach( $target_item -> tasks as $task){
        //   $totalNumber = $totalNumber + $task->pivot->quantity;
        //}
        $allItems = $item->select('name')->get();// just fetch the 'name' column from item model 
        //return response()->json($allItems);
        $allTasks = $task->whereIn('user_id', $request->user())->with('user');
        $tasks = $allTasks->orderBy('created_at','desc')->take(20)->get();
        return response()->json([
            'tasks'=>$tasks,
            'itemList'=>$allItems
        ]);
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
        Task::findOrFail($id)->delete();
    }
}
