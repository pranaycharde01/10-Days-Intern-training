<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use Illuminate\Http\Request;

class InspectionController extends Controller
{
    public function index()
    {
        return response()->json(
            Inspection::with('facility')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_id' => 'required|exists:facilities,id',
            'inspector_name' => 'required|string|max:100',
            'inspection_date' => 'required|date',
            'score' => 'nullable|numeric|min:0|max:10',
            'remarks' => 'nullable|string',
        ]);

        $inspection = Inspection::create($validated);

        return response()->json($inspection, 201);
    }

    public function show(Inspection $inspection)
    {
        return response()->json(
            $inspection->load('facility')
        );
    }

    public function update(Request $request, Inspection $inspection)
    {
        $validated = $request->validate([
            'facility_id' => 'sometimes|exists:facilities,id',
            'inspector_name' => 'sometimes|string|max:100',
            'inspection_date' => 'sometimes|date',
            'score' => 'nullable|numeric|min:0|max:10',
            'remarks' => 'nullable|string',
        ]);

        $inspection->update($validated);

        return response()->json(
            $inspection->load('facility')
        );
    }

    public function destroy(Inspection $inspection)
    {
        $inspection->delete();

        return response()->json([
            'message' => 'Inspection deleted successfully'
        ]);
    }
}
