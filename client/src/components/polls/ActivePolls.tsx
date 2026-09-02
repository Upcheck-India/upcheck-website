import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Calendar, Vote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Option {
  id: string;
  label: string;
  votes: number;
}

interface Poll {
  id: string;
  category: string;
  question: string;
  options: Option[];
  votesCount: string;
  timeLeft: string;
}

const INITIAL_POLLS: Poll[] = [
  {
    id: "active_water",
    category: "Community Choice",
    question: "Which UpCheck feature would you use the most?",
    options: [
      { id: "do", label: "AI Disease Detection", votes: 412 },
      { id: "ph", label: "Water Quality Monitoring", votes: 290 },
      { id: "ammonia", label: "Feed Optimization", votes: 180 },
      { id: "expense", label: "Expense Tracking", votes: 95 },
    ],
    votesCount: "977 votes",
    timeLeft: "4 days left",
  },
  {
    id: "active_feeding",
    category: "Farming Trends",
    question: "What do you check first every morning?",
    options: [
      { id: "autofeeder", label: "Water", votes: 310 },
      { id: "handfeeding", label: "Shrimp Health", votes: 490 },
      { id: "hybrid", label: "Feed", votes: 210 },
      { id: "weather", label: "Weather", votes: 120 },
    ],
    votesCount: "1,130 votes",
    timeLeft: "5 days left",
  },
  {
    id: "active_biosecurity",
    category: "Future Features",
    question: "What would you like UpCheck to launch next?",
    options: [
      { id: "fencing", label: "Market Price Alerts", votes: 312 },
      { id: "disinfection", label: "AI Feed Recommendations", votes: 120 },
      { id: "quarantine", label: "Smart Harvest Planner", votes: 520 },
      { id: "forum", label: "Community Discussion Forum", votes: 240 },
    ],
    votesCount: "1,192 votes",
    timeLeft: "12 days left",
  },
];

export default function ActivePolls() {
  const [pollsData, setPollsData] = useState<Poll[]>(INITIAL_POLLS);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [votedStates, setVotedStates] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleVoteSubmit = (pollId: string) => {
    const choice = selectedOptions[pollId];
    if (!choice) return;

    // Save vote status
    setVotedStates((prev) => ({ ...prev, [pollId]: choice }));

    // Increment votes count in local React state
    setPollsData((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id !== pollId) return poll;
        return {
          ...poll,
          options: poll.options.map((opt) =>
            opt.id === choice ? { ...opt, votes: opt.votes + 1 } : opt
          ),
          votesCount: (parseInt(poll.votesCount.replace(/,/g, "")) + 1).toLocaleString() + " votes",
        };
      })
    );

    toast({
      title: "Vote Counted!",
      description: "Your selection has been registered anonymously.",
    });
  };

  return (
    <section className="py-24 px-6 bg-[#F7FCFF] relative border-b border-border/40">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Title staggered entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-[#0067B1] bg-clip-text text-transparent" data-testid="active-polls-title">
            Active Community Polls
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cast your vote on trending topics and see how your opinions compare with the rest of the farming community in real-time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pollsData.map((poll, index) => {
            const hasVoted = !!votedStates[poll.id];
            const userChoice = votedStates[poll.id];
            const selectedChoice = selectedOptions[poll.id] || "";
            const totalVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0);

            return (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.15 + 0.1 }}
                className="flex w-full"
              >
                <motion.div
                  className="group flex flex-col w-full border border-card-border/75 bg-site-gradient p-8 md:p-10 relative overflow-hidden rounded-xl shadow-md cursor-pointer"
                  data-testid={`active-poll-card-${index}`}
                  whileHover={{
                    y: -10,
                    scale: 1.025,
                    boxShadow: "0 20px 30px -10px rgba(0, 103, 177, 0.15), 0 10px 15px -5px rgba(0, 201, 228, 0.1)",
                    borderColor: "rgba(0, 201, 228, 0.45)",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {/* Hover background brightening overlay */}
                  <div className="absolute inset-0 bg-white/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

                  {/* Visual Top Highlight Gradient Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#0067B1] z-10" />

                  <CardHeader className="p-0 mb-6 relative z-10">
                    <span className="text-sm font-semibold text-primary mb-3 block">
                      {poll.category}
                    </span>
                    <CardTitle className="text-xl md:text-2xl font-bold leading-tight text-foreground min-h-[64px]">
                      {poll.question}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 flex-grow mb-8 relative z-10">
                    <AnimatePresence mode="wait">
                      {!hasVoted ? (
                        <motion.div
                          key="voting-options"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                          <RadioGroup
                            value={selectedChoice}
                            onValueChange={(val) =>
                              setSelectedOptions((prev) => ({ ...prev, [poll.id]: val }))
                            }
                            className="grid gap-2.5"
                          >
                            {poll.options.map((opt) => (
                              <motion.div
                                key={opt.id}
                                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all text-sm md:text-base ${
                                  selectedChoice === opt.id
                                    ? "border-primary bg-primary/5 font-semibold"
                                    : "border-border/60 bg-background/55 hover:border-primary/20"
                                }`}
                                onClick={() =>
                                  setSelectedOptions((prev) => ({ ...prev, [poll.id]: opt.id }))
                                }
                                animate={{
                                  scale: selectedChoice === opt.id ? 1.015 : 1,
                                  borderColor: selectedChoice === opt.id ? "rgba(0, 103, 177, 0.7)" : "rgba(226, 232, 240, 0.6)",
                                  backgroundColor: selectedChoice === opt.id ? "rgba(0, 103, 177, 0.05)" : "rgba(255, 255, 255, 0.55)",
                                }}
                                whileHover={{ scale: selectedChoice === opt.id ? 1.015 : 1.005 }}
                                whileTap={{ scale: 0.995 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                              >
                                <RadioGroupItem value={opt.id} id={`${poll.id}-${opt.id}`} />
                                <Label
                                  htmlFor={`${poll.id}-${opt.id}`}
                                  className="cursor-pointer flex-1 py-0.5 text-foreground leading-normal"
                                >
                                  {opt.label}
                                </Label>
                              </motion.div>
                            ))}
                          </RadioGroup>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="voting-results"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center gap-1.5 text-green-500 font-semibold text-xs bg-green-500/10 px-3 py-2 rounded border border-green-500/20 w-fit mb-4">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Consensus registered!</span>
                          </div>

                          {poll.options.map((opt) => {
                            const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                            const isUserSelection = opt.id === userChoice;

                            return (
                              <div key={opt.id} className="space-y-1">
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                  <span className={`font-medium ${isUserSelection ? "text-primary" : "text-foreground"}`}>
                                    {opt.label}
                                    {isUserSelection && <span className="ml-2 text-[9px] bg-primary/10 text-primary border border-primary/20 px-1 py-0.2 rounded font-semibold">Selected</span>}
                                  </span>
                                  <span className="font-bold text-foreground">{percent}%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/10">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                                    className="h-full rounded-full"
                                    style={{
                                      background: isUserSelection
                                        ? "linear-gradient(90deg, #00C9E4 0%, #0077B6 100%)"
                                        : "linear-gradient(90deg, #e6f7fb 0%, #bfeefa 100%)"
                                    }}
                                  />
                                </div>
                                <div className="text-[10px] text-muted-foreground pl-0.5">
                                  {opt.votes.toLocaleString()} answers
                                </div>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>

                  {/* Metadata and VOTE Action Section */}
                  <CardFooter className="p-0 border-t border-border/40 pt-5 flex items-center justify-between mt-auto text-xs text-muted-foreground relative z-10">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{poll.votesCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{poll.timeLeft}</span>
                      </div>
                    </div>

                    {!hasVoted && (
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          disabled={!selectedChoice}
                          onClick={() => handleVoteSubmit(poll.id)}
                          className="gap-1.5 px-5 font-semibold text-xs animate-none"
                          style={{
                            background: selectedChoice
                              ? "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)"
                              : "hsl(var(--muted))",
                            border: "none",
                            color: selectedChoice ? "white" : "hsl(var(--muted-foreground))"
                          }}
                        >
                          <Vote className="w-3.5 h-3.5" />
                          VOTE
                        </Button>
                      </motion.div>
                    )}
                  </CardFooter>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
