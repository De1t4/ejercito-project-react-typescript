import LayoutContent from "@/shared/layouts/LayoutContent";
import { useState } from "react";
import PrimaryView from "./components/ProfilePrimaryView";
import SecondaryView from "./components/ProfileSecondaryView";
import { AnimatePresence } from "framer-motion";

type typeScreen = 'primary' | 'secondary'

export default function UserProfile() {
  const [screen, setScreen] = useState<typeScreen>('primary')
  return (
    <>
      <LayoutContent>
        <AnimatePresence >
          {
            screen === 'primary' ? (
              <PrimaryView
                handleScreenView={setScreen}
              />
            ) : (
              <SecondaryView
                handleScreenView={setScreen}
              />
            )
          }
        </AnimatePresence>
      </LayoutContent>
    </>
  )
}