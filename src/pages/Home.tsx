import {
  skills,
  experiences,
} from '../constants';

import SkillLayout from '../components/SkillLayout';

import CTA from '../components/CTA';
import ExperienceLayout from '../components/ExperienceLayout';

const Home = () => {
  return (
    <section className='max-container min-h-screen h-full'>
      <h1 className='head-text'>Hey, I'm <span className='font-semibold drop-shadow text-blue-500'>Perry <span className='uppercase'> Chouteau</span></span></h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p><span className='font-semibold'>Software engineer expert</span>, from France. I'm actively pushing my skills forward.</p>
      </div>

      {/* My Skills */}
      < SkillLayout skills={skills} />
    
      {/* My Experience */}
      < ExperienceLayout experiences={experiences} />

      <hr className='border-slate-200'></hr>
      <CTA />
    </section>
  );
};

export default Home;