import React from 'react';
import {
  Skill, skills,
  Experience, experiences,
} from '../constants';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import exp from 'constants';
import hexRgbLightner from '../utils/lightener';
import CTA from '../components/CTA';

const About = () => {
  return (
    <section className='max-container min-h-screen h-full'>
      <h1 className='head-text'>Hey, I'm <span className='font-semibold drop-shadow text-blue-500'>Perry <span className='uppercase'> Chouteau</span></span></h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p><span className='font-semibold'>Software engineer expert</span>, from France. I'm actively pushing my skills forward.</p>
      </div>
      {/* My Skills */}
      <div className='#skills py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        
        <div className='mt-16 flex flex-wrap gap-8 justify-center items-center'>
          {skills.map((skill: Skill) => (
            <div className='justify-center items-center'>
              {/*icon*/}
              <div className='block-container red w-20 h-20 mb-3'>
                <div className='btn-back rounded-xl'/>
                <div className='btn-front rounded-xl flex justify-center items-center'>
                  <img 
                    src={skill.imageUrl}
                    alt={skill.name}
                    className='w-[75%] h-[75%] object-contain'
                  />
                </div>
              </div>
              {/*name*/}
              <p className='text-center text-black-500 text-xs font-light font-poppins self-center'>{skill.name}</p>
              <p className='text-center text-black-500 text-xs font-extralight font-poppins self-center'>{skill.type}</p>
              </div>
          ))/*.sort((a, b) => 0.5 - Math.random())*/}
        </div>
      </div>
      {/* My Experience */}
      <div className='#experiences py-10 flex flex-col'>
        <h3 className='subhead-text'>Work Experiences</h3>
        
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>I already earn some <span className='font-semibold'>experiences</span>, working in <span className='font-semibold'>companies</span> and <span className='font-semibold'>universities</span>.</p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience: Experience) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentArrowStyle={{ borderRight: '7px solid white' }}
                date={experience.date}
                icon={<div className='flex justify-center items-center w-full h-full'>
                  <img 
                    src={experience.icon}
                    alt={experience.title}
                    className='w-[80%] h-[80%] object-contain'/>
                  </div>
                }
                iconStyle={{
                  background: hexRgbLightner(experience.iconBG, 0.2), 
                }}
                contentStyle={{
                  borderBottom: '8px',
                  borderStyle: 'solid',
                  borderBottomColor: hexRgbLightner(experience.iconBG, 0.2),
                  boxShadow: 'none',
                }}
              >
                <div>
                  <h3 className="text-black text-xl font-poppins font-semibold">{experience.title}</h3>
                  <div className='flex items-center gap-2 -space-x-1'>
                  <h3 className='text-black-500 font-medium text-sm' style={{color: hexRgbLightner(experience.iconBG, 0.8), margin: 0}}>{experience.company_name}</h3>
                  <h4 className="text-black-500 font-light text-sm ">{experience.location}</h4>
                  </div>
                </div>
                {(experience.description !== null)?  <h4 className="text-black text-sm font-poppins font-medium mt-2 rounded-md inline-block">
                  {experience.description}
                </h4>: <span/>}
                <ul className="my-5 list-disc ml-5 space-y-1">
                  {experience.points.map((point: string) => (
                    <li className='text-black-500/50 font-normal ml-2 pl-1 text-sm' >{point}</li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className='border-slate-200'></hr>
      <CTA />
    </section>
  );
};

export default About;