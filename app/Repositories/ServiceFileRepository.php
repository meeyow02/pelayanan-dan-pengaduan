<?php

namespace App\Repositories;

use App\Models\ServiceFile;

class ServiceFileRepository implements ServiceFileRepositoryInterface
{
    protected $ServiceFile;

    public function __construct(ServiceFile $ServiceFile)
    {
        $this->ServiceFile = $ServiceFile;
    }

    public function getAll($search = null)
    {
        $query =  $this->ServiceFile;

        if ($search) {
            $query->where('replacethis', 'LIKE', '%' . $search . '%');
        }

        return $query->paginate(10);
    }

    public function findById(int $id)
    {
        return $this->ServiceFile::find($id);
    }

    public function store(array $data)
    {
        return $this->ServiceFile::create($data);
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