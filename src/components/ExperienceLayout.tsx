import { Experience } from '../constants';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import exp from 'constants';
import hexRgbLightner from '../utils/lightener';

const ExperienceLayout = ({experiences}:{experiences: Experience[]}) => {
    return (
        <div className='#experiences py-10 flex flex-col'>
        <h3 className='subhead-text'>Work Experiences</h3>

        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>I already earn some <span className='font-semibold'>experiences</span>, working at <span className='font-semibold'>companies</span> and <span className='font-semibold'>universities</span>.</p>
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
                    className='w-[80%] h-[80%] object-contain' />
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
                    <h3 className='text-black-500 font-medium text-sm' style={{ color: hexRgbLightner(experience.iconBG, 0.8), margin: 0 }}>{experience.company_name}</h3>
                    <h4 className="text-black-500 font-light text-sm ">{experience.location}</h4>
                  </div>
                </div>
                {(experience.description !== null) ? <h4 className="text-black text-sm font-poppins font-medium mt-2 rounded-md inline-block">
                  {experience.description}
                </h4> : <span />}
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
    )
}

export default ExperienceLayout;