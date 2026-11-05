// src/hooks/useProfile.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { profileData as fallbackProfile } from '../data/portfolioData';

export function useProfile() {
  // শুরুতে ডিফল্ট হার্ডকোডেড ডেটা থাকবে, ডেটাবেস থেকে ডেটা আসলে এটি আপডেট হবে
  const [profile, setProfile] = useState(fallbackProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase.from('profiles').select('*').maybeSingle();
        
        if (data) {
          setProfile({
            name: data.name || fallbackProfile.name,
            nameEn: data.name_en || fallbackProfile.nameEn,
            bio: data.bio || fallbackProfile.bio,
            bioEn: data.bio_en || fallbackProfile.bioEn,
            email: data.email || fallbackProfile.email,
            whatsapp: data.whatsapp || fallbackProfile.whatsapp,
            location: data.location || fallbackProfile.location,
            defaultAvatar: data.default_avatar || fallbackProfile.defaultAvatar,
            socials: {
              youtube: data.youtube || fallbackProfile.socials.youtube,
              facebook: data.facebook || fallbackProfile.socials.facebook,
              instagram: data.instagram || fallbackProfile.socials.instagram,
              linkedin: data.linkedin || fallbackProfile.socials.linkedin,
            }
          });
        }
      } catch (error) {
        console.error("ডেটাবেস থেকে প্রোফাইল আনতে সমস্যা হয়েছে:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, isLoading };
}