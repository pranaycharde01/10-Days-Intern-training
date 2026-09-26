<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{
    public function index()
    {
        return response()->json(
            Complaint::with(['user', 'facility'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'facility_id' => 'required|exists:facilities,id',
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'status' => 'nullable|string|max:50',
        ]);

        $complaint = Complaint::create($validated);

        return response()->json($complaint, 201);
    }

    public function show(Complaint $complaint)
    {
        return response()->json(
            $complaint->load(['user', 'facility'])
        );
    }

    public function update(Request $request, Complaint $complaint)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'facility_id' => 'sometimes|exists:facilities,id',
            'title' => 'sometimes|string|max:150',
            'description' => 'sometimes|string',
            'status' => 'sometimes|string|max:50',
        ]);

        $complaint->update($validated);

        return response()->json(
            $complaint->load(['user', 'facility'])
        );
    }

    public function destroy(Complaint $complaint)
    {
        $complaint->delete();

        return response()->json([
            'message' => 'Complaint deleted successfully'
        ]);
    }
}
