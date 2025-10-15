<?php

namespace App\Repositories;

use App\Models\Service;

class ServiceRepository implements ServiceRepositoryInterface
{
    protected $Service;

    public function __construct(Service $Service)
    {
        $this->Service = $Service;
    }

    public function getAll($search = null)
    {
        $query = $this->Service::with('serviceCategory');

        if ($search) {
            $query->where('description', 'LIKE', '%' . $search . '%');
        }

        return $query->paginate(10);
    }

    public function findById(int $id)
    {
        return $this->Service::find($id)::with('serviceCategory')->first();
    }

    public function store(array $data)
    {
        return $this->Service::create($data);
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