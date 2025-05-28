import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getMeAndMyArticles } from '@/lib/strapi/user';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const sessionUser = await session?.user;
   
  
  if (!session) {
    redirect('/login');
  }
  const { user, articles } = await getMeAndMyArticles(sessionUser);
   try {
    return <ProfileContent user={user} articles={articles} />;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return <div>Error loading profile</div>;
  }
} 