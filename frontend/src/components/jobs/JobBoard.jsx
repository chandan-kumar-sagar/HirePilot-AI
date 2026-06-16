import React, { useState } from 'react';
import JobColumn from '@/components/jobs/JobColumn';
import CreateJobModal from '@/components/jobs/CreateJobModal';
import JobStats from '@/components/jobs/JobStats';
import { useJobs, useJobStats } from '@/features/jobs/jobs.hooks';

export default function JobBoard() {
  const [showModal, setShowModal] = useState(false);

  const { data: jobsData, isLoading: isJobsLoading } = useJobs();
  const { data: statsData, isLoading: isStatsLoading } = useJobStats();

  const jobs = jobsData?.jobs || [];
  const stats = statsData?.stats || { saved: 0, applied: 0, interview: 0, offer: 0, rejected: 0 };

  const columns = {
    'Saved': jobs.filter((j) => j.status === 'saved'),
    'Applied': jobs.filter((j) => j.status === 'applied'),
    'Interview': jobs.filter((j) => j.status === 'interview'),
    'Offer': jobs.filter((j) => j.status === 'offer'),
    'Rejected': jobs.filter((j) => j.status === 'rejected'),
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Job Tracker Board</h1>
        <button
          className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--primary-dark)] transition-colors"
          onClick={() => setShowModal(true)}
        >
          + Add Application
        </button>
      </header>

      {isStatsLoading ? (
        <div className="h-32 bg-gray-200 animate-pulse rounded-xl mb-6"></div>
      ) : (
        <div className="mb-6">
          <JobStats stats={stats} />
        </div>
      )}

      {isJobsLoading ? (
        <div className="flex gap-4">
          <div className="w-1/3 h-96 bg-gray-200 animate-pulse rounded-xl"></div>
          <div className="w-1/3 h-96 bg-gray-200 animate-pulse rounded-xl"></div>
          <div className="w-1/3 h-96 bg-gray-200 animate-pulse rounded-xl"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:overflow-x-auto gap-4 pb-4">
          {Object.entries(columns).map(([title, colJobs]) => (
            <JobColumn key={title} title={title} jobs={colJobs} />
          ))}
        </div>
      )}

      {/* Basic modal wrapper for CreateJobModal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <CreateJobModal onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
