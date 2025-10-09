import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRef } from "react";

const teamMembers = [
  {
    name: "Kiran Sekar S",
    role: "Core member",
    description: "Passionate about sustainable farming and empowering communities.",
    initials: "KS",
    color: "bg-blue-500"
  },

  
  {
    name: "Robinkumar J",
    role: "Core member",
    description: "Committed to revolutionizing the aquaculture industry.",
    initials: "RJ",
    color: "bg-green-500"
  },
  {
    name: "Nithish Kumar B",
    role: "Core member",
    description: "Dedicated to building innovative aquaculture solutions.",
    initials: "NK",
    color: "bg-amber-500"
  }
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <section ref={ref} className="py-20 px-6 bg-site-gradient bg-background" data-testid="section-team">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-team-title">
            Our Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-team-subtitle">
            Meet the passionate individuals behind UpCheck
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              data-testid={`card-team-${i}`}
            >
              <Card className="p-6 text-center h-full hover-elevate active-elevate-2 w-72">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 flex justify-center"
                >
                  <Avatar className="w-24 h-24" data-testid={`avatar-team-${i}`}>
                    <AvatarFallback className={`${member.color} text-white text-2xl font-bold`}>
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                
                <h3 className="text-lg font-bold mb-1" data-testid={`text-team-name-${i}`}>
                  {member.name}
                </h3>
                <p className="text-sm text-primary mb-3" data-testid={`text-team-role-${i}`}>
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground" data-testid={`text-team-desc-${i}`}>
                  {member.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
