<?php

namespace App\Services;

use App\Repositories\ServiceFileRepositoryInterface;

class ServiceFileService
{
    public function __construct(
        protected ServiceFileRepositoryInterface $ServiceFileRepository
    ) {
    }

    public function getAll($search = null)
    {
        return $this->ServiceFileRepository->getAll($search);
    }

    public function findById(int $id)
    {
        return $this->ServiceFileRepository->findById($id);
    }

    public function store(array $data)
    {
        return $this->ServiceFileRepository->store($data);
    }

    public function update(int $id, array $data)
    {
        return $this->ServiceFileRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->ServiceFileRepository->delete($id);
    }
}