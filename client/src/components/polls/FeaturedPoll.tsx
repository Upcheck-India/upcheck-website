import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Award, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OPTIONS = [
  { id: "water_quality", label: "Water Quality", baseVotes: 582 },
  { id: "disease", label: "Disease Management", baseVotes: 412 },
  { id: "feed_costs", label: "Feed Cost", baseVotes: 290 },
  { id: "seed_quality", label: "Weather Conditions", baseVotes: 140 },
];

export default function FeaturedPoll() {
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
  const [votesData, setVotesData] = useState(OPTIONS);
  const { toast } = useToast();

  const handleVoteSubmit = () => {
    if (!selectedOptionId) return;

    setVotedOptionId(selectedOptionId);

    const updated = OPTIONS.map(opt => 
      opt.id === selectedOptionId ? { ...opt, baseVotes: opt.baseVotes + 1 } : opt
    );
    setVotesData(updated);

    toast({
      title: "Vote Registered!",
      description: "Thank you for contributing your real-time aquaculture insight.",
    });
  };

  const totalVotes = votesData.reduce((acc, curr) => acc + curr.baseVotes, 0);

  return (
    <section id="featured-poll" className="py-20 px-6 bg-background relative">
      <div className="container mx-auto max-w-4xl">
        {/* Staggered Heading Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
            <Award className="w-4 h-4 text-[#00C9E4]" />
            <span>Featured Weekly Poll</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-[#0067B1] bg-clip-text text-transparent" data-testid="featured-poll-title">
            Community Poll of the Week
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your anonymous responses directly guide our predictive algorithms and feed planning research.
          </p>
        </motion.div>

        {/* Premium Entrance Card (Scale, y-slide, and shadow fade) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96, boxShadow: "0 0px 0px rgba(0, 0, 0, 0)" }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)" 
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <Card className="overflow-hidden border border-card-border/80 relative" data-testid="featured-poll-card">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-[#0067B1]" />
            
            <CardHeader className="md:p-8">
              <CardTitle className="text-xl md:text-2xl font-bold leading-snug">
                What's your biggest focus this week?
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground/80 mt-1">
                Select one option. Results are dynamically aggregated across all regions in real-time.
              </CardDescription>
            </CardHeader>

            <CardContent className="md:p-8 pt-0">
              <AnimatePresence mode="wait">
                {!votedOptionId ? (
                  <motion.div
                    key="vote-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <RadioGroup
                      value={selectedOptionId}
                      onValueChange={setSelectedOptionId}
                      className="grid gap-4"
                    >
                      {votesData.map((option) => {
                        const isSelected = selectedOptionId === option.id;
                        return (
                          <motion.div
                            key={option.id}
                            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer ${
                              isSelected 
                                ? "border-primary bg-primary/5 shadow-md" 
                                : "border-border/60 bg-site-gradient hover:border-primary/40 hover:bg-primary/2"
                            }`}
                            onClick={() => setSelectedOptionId(option.id)}
                            animate={{
                              scale: isSelected ? 1.015 : 1,
                              borderColor: isSelected ? "rgba(0, 103, 177, 0.7)" : "rgba(226, 232, 240, 0.6)",
                              backgroundColor: isSelected ? "rgba(0, 103, 177, 0.05)" : "rgba(255, 255, 255, 0.55)",
                            }}
                            whileHover={{ scale: isSelected ? 1.015 : 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          >
                            <RadioGroupItem
                              value={option.id}
                              id={option.id}
                              className="mt-1 accent-primary"
                            />
                            <Label
                              htmlFor={option.id}
                              className="font-medium text-base text-foreground cursor-pointer flex-1 select-none"
                            >
                              {option.label}
                            </Label>
                          </motion.div>
                        );
                      })}
                    </RadioGroup>

                    <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Users className="w-4 h-4" />
                        <span>{totalVotes.toLocaleString()} farmers have responded</span>
                      </div>

                      <motion.div whileTap={{ scale: 0.96 }} className="w-fit">
                        <Button
                          type="button"
                          onClick={handleVoteSubmit}
                          disabled={!selectedOptionId}
                          className="px-8 font-semibold relative overflow-hidden"
                          style={{
                            background: selectedOptionId 
                              ? "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)" 
                              : "hsl(var(--muted))",
                            border: "none",
                            color: selectedOptionId ? "white" : "hsl(var(--muted-foreground))"
                          }}
                          data-testid="button-submit-vote"
                        >
                          Cast Vote
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results-display"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 text-green-500 font-semibold mb-4 bg-green-500/10 px-4 py-2.5 rounded-lg border border-green-500/20 w-fit">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Your vote has been saved. Live consensus below:</span>
                    </div>

                    <div className="space-y-5">
                      {votesData.map((option) => {
                        const percentage = totalVotes > 0 ? Math.round((option.baseVotes / totalVotes) * 100) : 0;
                        const isUserChoice = option.id === votedOptionId;

                        return (
                          <div key={option.id} className="space-y-2">
                            <div className="flex justify-between items-center text-sm md:text-base">
                              <span className={`font-medium ${isUserChoice ? "text-primary" : "text-foreground"}`}>
                                {option.label} {isUserChoice && <span className="text-xs bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded ml-2 font-semibold">Your Vote</span>}
                              </span>
                              <span className="font-bold text-foreground">{percentage}%</span>
                            </div>
                            <div className="relative h-3 w-full bg-muted rounded-full overflow-hidden border border-border/20">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                                className="h-full rounded-full"
                                style={{
                                  background: isUserChoice
                                    ? "linear-gradient(90deg, #00C9E4 0%, #0077B6 100%)"
                                    : "linear-gradient(90deg, #e6f7fb 0%, #90e0ef 100%)"
                                }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground pl-1">
                              {option.baseVotes.toLocaleString()} votes
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center flex-wrap gap-4 pt-6 border-t border-border/50 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Consensus based on {totalVotes.toLocaleString()} answers</span>
                      </div>
                      <span>Real-time tracking active</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
