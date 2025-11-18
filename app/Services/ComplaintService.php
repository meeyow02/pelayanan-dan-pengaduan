<?php

namespace App\Services;

use App\Repositories\ComplaintRepositoryInterface;

class ComplaintService
{
    public function __construct(
        protected ComplaintRepositoryInterface $ComplaintRepository
    ) {}

    public function getAll($search = null, $limit = 10)
    {
        return $this->ComplaintRepository->getAll($search, $limit);
    }

    public function findById(int $id)
    {
        return $this->ComplaintRepository->findById($id);
    }

    public function store(array $data)
    {
        return $this->ComplaintRepository->store($data);
    }

    public function update(int $id, array $data)
    {
        return $this->ComplaintRepository->update($id, $data);
    }

    public function updateStatus(int $id, string $status)
    {
        return $this->ComplaintRepository->updateStatus($id, $status);
    }

    public function delete(int $id)
    {
        return $this->ComplaintRepository->delete($id);
    }
}
