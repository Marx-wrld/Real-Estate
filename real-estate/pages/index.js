import DefaultLayout from "@/features/Layouts/DefaultLayout/DefaultLayout";
import HeroBanner from "@/features/Home/components/HeroBanner/HeroBanner";
import FeaturedProperties from "@/features/Home/components/FeaturedProperties/FeaturedProperties";
import MeetTheTeam from "@/features/Home/components/MeetTheTeam/MeetTheTeam";

export default function Home({featuredProperties}) {
  return (
      <DefaultLayout>
        <HeroBanner />
        <FeaturedProperties featuredProperties={featuredProperties}/>
        <MeetTheTeam />
      </DefaultLayout>
  );
}

export async function getStaticProps(){
  const {hits} = require('@/features/data/properties');
  return {
    props: {featuredProperties: hits.slice(0, 5)}
  };
};