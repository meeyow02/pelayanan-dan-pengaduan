<?php

namespace App\Http\Controllers;

use App\Services\ComplaintService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    public function __construct(
        private ComplaintService $complaintService
    ) {
    }

    public function index()
    {
        $complaints = $this->complaintService->getAll();
        return Inertia::render('Complaint/Index', compact('complaints'));
    }
}
