import { Button } from "@/components/ui/button";
import { Compass, Settings, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { Gratitude } from "@/lib/types";
import { theme } from "@/lib/theme";
import { GratitudeCard } from "@/components/GratitudeCard";
import { getGratitudes } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { SettingsDialog } from "./SettingsDialog";

interface VaultProps {
  initialGratitudes: Gratitude[];
  fetchGratitudes: () => void;
}

const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    console.log("URL copied to clipboard");
  } catch (err) {
    console.error("Failed to copy URL: ", err);
  }
};

const AnimatedCard = ({ index, children }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export function Vault({ initialGratitudes, fetchGratitudes }: VaultProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [gratitudes, setGratitudes] = useState(initialGratitudes);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    setGratitudes(initialGratitudes);
    setIsClient(true);
  }, [initialGratitudes]);

  const refreshGratitudes = async () => {
    await fetchGratitudes();
  };

  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: theme.colors.text.primary }}
      >
        Your Gratitude Vault
      </h2>
      <div className="flex space-x-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          className="button-hover flex-1"
          style={{
            backgroundColor: "white",
            color: theme.colors.text,
            border: `1px solid ${theme.colors.primary}`,
          }}
        >
          <Compass className="mr-2 h-4 w-4" />
          Explore
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="button-hover flex-1"
          onClick={() => setIsSettingsOpen(true)}
          style={{
            backgroundColor: "white",
            color: theme.colors.text,
            border: `1px solid ${theme.colors.primary}`,
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="button-hover flex-1"
          onClick={() => {
            const baseUrl = isClient
              ? `${window.location.protocol}//${window.location.host}`
              : process.env.NEXTAUTH_URL;
            const thingToCopy = `${baseUrl}/vault/${session?.user?.publicUrl}`;
            toast({
              title: isClient
                ? "Copied to clipboard"
                : "Please copy to clipboard to share!",
              description: thingToCopy,
            });
            if (isClient) copyToClipboard(thingToCopy);
          }}
          style={{
            backgroundColor: "white",
            color: theme.colors.text,
            border: `1px solid ${theme.colors.primary}`,
          }}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      <div ref={scrollRef} className="h-[calc(105vh-250px)] overflow-y-auto">
        <div className="space-y-4">
          {gratitudes.map((gratitude, index) => (
              <GratitudeCard
                gratitude={gratitude}
                onUpdate={refreshGratitudes}
              />
          ))}
        </div>
      </div>
      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
}
