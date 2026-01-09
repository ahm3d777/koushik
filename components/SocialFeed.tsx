
import React from 'react';
import { Twitter, Linkedin, ExternalLink } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    platform: 'twitter',
    content: "Just dropped a new article on High-Performance React Rendering patterns. Check it out! #reactjs #webdev",
    date: '2 days ago',
    likes: 124,
    link: '#'
  },
  {
    id: 2,
    platform: 'linkedin',
    content: "Excited to announce that I've successfully migrated our core infrastructure to Kubernetes. Here are my key takeaways from the process...",
    date: '5 days ago',
    likes: 342,
    link: '#'
  },
  {
    id: 3,
    platform: 'twitter',
    content: "The new CSS container queries are absolute game changers for component-driven design. Finally!",
    date: '1 week ago',
    likes: 89,
    link: '#'
  }
];

const SocialFeed: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-bold mb-6 flex items-center gap-2">
         Latest Updates
         <span className="text-xs font-normal text-neutral-500 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full">Live Feed</span>
      </h3>
      {POSTS.map(post => (
        <a 
          key={post.id} 
          href={post.link}
          className="block bg-neutral-900 p-5 rounded-xl border border-neutral-800 hover:border-rose-500/50 transition-colors group"
        >
           <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg ${post.platform === 'twitter' ? 'bg-blue-500/10 text-blue-500' : 'bg-blue-700/10 text-blue-700'}`}>
                 {post.platform === 'twitter' ? <Twitter size={16} /> : <Linkedin size={16} />}
              </div>
              <ExternalLink size={14} className="text-neutral-600 group-hover:text-white transition-colors" />
           </div>
           <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
             {post.content}
           </p>
           <div className="flex justify-between items-center text-xs text-neutral-500">
              <span>{post.date}</span>
              <span>{post.likes} Likes</span>
           </div>
        </a>
      ))}
    </div>
  );
};

export default SocialFeed;
