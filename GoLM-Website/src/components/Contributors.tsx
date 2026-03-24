import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const contributors = [
  {
    name: "Bhavsh Nithin R",
    username: "adervark",
    role: "Creator & Lead Developer",
    avatar: "https://github.com/adervark.png",
    github: "https://github.com/adervark",
  },
];

const Contributors = () => {
  return (
    <section className="relative py-24 z-10 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Built by
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg"
          >
            Open source, made with passion.
          </motion.p>
        </div>

        <div className="flex justify-center">
          {contributors.map((person, i) => (
            <motion.a
              key={person.username}
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 max-w-xs w-full"
            >
              <img
                src={person.avatar}
                alt={person.name}
                className="w-20 h-20 rounded-full border-2 border-white/10 mb-4 group-hover:border-white/30 transition-colors"
              />
              <h3 className="text-white font-bold text-lg mb-0.5">{person.name}</h3>
              <div className="flex items-center gap-1 text-white/40 text-sm mb-2">
                <Github className="w-3.5 h-3.5" />
                <span>@{person.username}</span>
              </div>
              <p className="text-white/50 text-sm">{person.role}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors">
                <ExternalLink className="w-3 h-3" />
                <span>View Profile</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contributors;
