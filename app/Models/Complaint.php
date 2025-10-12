<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Complaint extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'complaint_category_id',
        'complaint_number',
        'content',
        'status',
        'filename',
    ];

    protected static function booted()
    {
        static::creating(function ($complaint) {
            $complaint->complaint_number = self::generateComplaintNumber();
        });
    }

    private static function generateComplaintNumber()
    {
        // Format: CMP-YYYYMMDD-XXXX
        $date = date('Ymd');
        $last = self::whereDate('created_at', date('Y-m-d'))
            ->orderBy('id', 'desc')
            ->first();

        $number = $last ? ((int) substr($last->complaint_number, -4) + 1) : 1;
        return 'CMP-' . $date . '-' . str_pad($number, 4, '0', STR_PAD_LEFT);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function complaintCategory()
    {
        return $this->belongsTo(ComplaintCategory::class);
    }
}
