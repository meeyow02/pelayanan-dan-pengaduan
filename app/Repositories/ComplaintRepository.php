<?php

namespace App\Repositories;

use App\Models\Complaint;

class ComplaintRepository implements ComplaintRepositoryInterface
{
    protected $Complaint;

    public function __construct(Complaint $Complaint)
    {
        $this->Complaint = $Complaint;
    }

    public function getAll($search = null)
    {
        $query = $this->Complaint;

        if ($search) {
            $query->where('complaint_number', 'LIKE', '%' . $search . '%');
        }

        return $query->paginate(10);
    }

    public function findById(int $id)
    {
        return $this->Complaint::find($id)->first();
    }

    public function store(array $data)
    {
        return $this->Complaint::create($data);
    }

    public function update(int $id, array $data)
    {
        $model = $this->findById($id);
        return $model ? $model->update($data) : null;
    }

    public function delete(int $id)
    {
        $model = $this->findById($id);
        return $model ? $model->delete() : null;
    }
}