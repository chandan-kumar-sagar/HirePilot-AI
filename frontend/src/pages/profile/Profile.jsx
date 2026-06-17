import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfoCard from "@/components/profile/ProfileInfoCard";
import SkillsCard from "@/components/profile/SkillsCard";
import ExperienceCard from "@/components/profile/ExperienceCard";
import ProfileStats from "@/components/profile/ProfileStats";
import EditProfileModal from "@/components/profile/EditProfileModal";

export default function Profile() {
  const { data, isLoading, error } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        <div className="h-48 bg-muted rounded-3xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 h-96 bg-muted rounded-3xl"></div>
          <div className="lg:col-span-2 space-y-8">
            <div className="h-64 bg-muted rounded-3xl"></div>
            <div className="h-64 bg-muted rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <p className="text-red-500 font-medium">Failed to load profile. Please try again.</p>
      </div>
    );
  }

  const user = data?.user;

  return (
    <div className="max-w-6xl mx-auto">
      <ProfileHeader user={user} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          <ProfileInfoCard user={user} onEditClick={() => setIsEditModalOpen(true)} />
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          <ProfileStats />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkillsCard user={user} />
            <ExperienceCard user={user} />
          </div>
        </div>
      </div>

      <EditProfileModal 
        user={user} 
        open={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </div>
  );
}
