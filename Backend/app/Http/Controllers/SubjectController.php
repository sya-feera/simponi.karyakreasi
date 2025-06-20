<?php

namespace App\Http\Controllers;

use App\Models\Subject;
// use App\Models\subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::with('classroom', 'mudaris')->get();

        if ($subjects->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('subjects',['subjects' => $subjects]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $subjects
        ], 200);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'day' => 'required|string',
            'year' => 'required|digits:4|integer',
            'jenjang' => 'required|string',
            'classroom_id' => 'required|exists:classrooms,id',
            'mudaris_id' => 'required|exists:mudaris,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // 3. Simpan data ke database
        $subjects = Subject::create([
            'name' => $request->name,
            'day' => $request->day,
            'year' => $request->year,
            'jenjang' => $request->jenjang,
            'classroom_id' => $request->classroom_id,
            'mudaris_id' => $request->mudaris_id,
        ]);


        return response()->json([
            'success' => true,
            'message' => 'Subject added successfully!',
            'data' => $subjects
        ], 201);
    }

    public function show(string $id)
    {
        $subjects = Subject::find($id);

        if (!$subjects) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get resources detail",
            "data" => $subjects
        ], 200);
    }

    public function update(string $id, Request $request)
    {

        $subjects = Subject::find($id);

        if (!$subjects) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        // 1. validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'day' => 'required|string',
            'year' => 'required|digits:4|integer',
            'jenjang' => 'required|string',
            'classroom_id' => 'required|exists:classrooms,id',
            'mudaris_id' => 'required|exists:mudaris,id',
        ]);

        // 2. check validator error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'name' => $request->name,
            'day' => $request->day,
            'year' => $request->year,
            'jenjang' => $request->jenjang,
            'classroom_id' => $request->classroom_id,
            'mudaris_id' => $request->mudaris_id,
        ];

        $subjects->update($data);

        return response()->json([
            "success" => true,
            "message" => "resources updated",
            "data" => $subjects
        ], 200);
    }

    public function destroy(string $id)
    {
        $subjects = Subject::find($id);

        if (!$subjects) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        $subjects->delete();

        return response()->json([
            "success" => true,
            "message" => "resources deleted",
        ], 204);
    }
}
