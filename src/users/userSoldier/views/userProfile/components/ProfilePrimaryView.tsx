import { motion } from 'framer-motion';
import Profile from './ProfileCard';
import Structure from './ProfileStructure';
import { useGlobalContext } from '@/context/globalContext';
import TabServices from '@/users/userSoldier/components/Tab/TabServices';

const PrimaryView = ({ handleScreenView }: { handleScreenView: (typeScreen: 'primary' | 'secondary') => void }) => {
  const { profile } = useGlobalContext()
  return (
    <motion.div
      key="initial"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className="transition-all ease-in-out duration-300 grid max-lg:grid-cols-2 max-lg:grid-rows-4 grid-cols-3 grid-rows-2 max-md:w-full w-[80rem] max-xl:w-full max-xl:gap-5 m-auto gap-10 max-md:grid-cols-1 max-md:grid-rows-2 max-md:gap-y-10 max-md:gap-x-0"
    >
      <Profile profile={profile} />
      <Structure
        company={profile?.soldier?.company}
        barrack={profile?.soldier?.barrack}
        armyBody={profile?.soldier?.body}
      />
      <TabServices
        handleScreenView={handleScreenView}
        profile={profile}
      />
    </motion.div>
  );
}

export default PrimaryView;
