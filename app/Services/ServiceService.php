<?php

namespace App\Services;

use App\Repositories\ServiceRepositoryInterface;

class ServiceService
{
    public function __construct(
        protected ServiceRepositoryInterface $ServiceRepository
    ) {
    }

    public function getAll($search = null, $limit = 10)
    {
        return $this->ServiceRepository->getAll($search, $limit);
    }

    public function findById(int $id)
    {
        return $this->ServiceRepository->findById($id);
    }

    public function store(array $data)
    {
        return $this->ServiceRepository->store($data);
    }

    public function update(int $id, array $data)
    {
        return $this->ServiceRepository->update($id, $data);
    }
    
    public function updateStatus(int $id, string $status)
    {
        return $this->ServiceRepository->updateStatus($id, $status);
    }

    public function delete(int $id)
    {
        return $this->ServiceRepository->delete($id);
    }
}