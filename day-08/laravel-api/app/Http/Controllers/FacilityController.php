<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;

class FacilityController extends Controller
{
    // Get all facilities
    public function index()
    {
        return response()->json(Facility::all());
    }

    // Create a new facility
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'cleanliness_score' => 'nullable|numeric|min:0|max:10',
            'status' => 'nullable|string|max:50',
        ]);

        $facility = Facility::create($validated);

        return response()->json($facility, 201);
    }

    // Get one facility
    public function show(Facility $facility)
    {
        return response()->json($facility);
    }

    // Update a facility
    public function update(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'location' => 'sometimes|string|max:100',
            'cleanliness_score' => 'nullable|numeric|min:0|max:10',
            'status' => 'nullable|string|max:50',
        ]);

        $facility->update($validated);

        return response()->json($facility);
    }

    // Delete a facility
    public function destroy(Facility $facility)
    {
        $facility->delete();

        return response()->json([
            'message' => 'Facility deleted successfully'
        ]);
    }
}

