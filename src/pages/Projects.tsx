import React from 'react';
import { Project, projects, Tag, tags } from '../constants';
import hexRgbLightner from '../utils/lightener';
import {github} from '../assets/icons'

const Projects = () => {
  return (
    <section className='max-container min-h-screen h-full'>
      <h1 className='head-text'>My <span className='font-semibold drop-shadow text-blue-500'>Projects</span></h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>Watch out some of my <span className='font-semibold'>Work</span></p>
      </div>
      <div className='my-2 pb-4 flex flex-wrap justify-center gap-2'>
        {projects.map((project: Project) => (
          <div className='relative md:w-[400px] w-full bg-white drop-shadow-md shadow-md mt-4 px-3 py-2 rounded-lg border-b-8' style={{borderBlockColor: hexRgbLightner(project.color, 0.2)}}>
              <h3 className='text-black text-2xl font-bold font-poppins'>{project.title}</h3>
              <p className='text-slate-500 w-[80%]'>{project.description}</p>
              <div className='flex flex-wrap pb-2'>
                {project.tags.map((tag: Tag) => (
                  <div className='relative inline-block group'>
                    <a className='text-xs text-white font-poppins font-medium rounded-full px-2 py-1 m-1 select-none' style={{background: hexRgbLightner(project.color, 0.5)}} href={tag.url}>{tag.name}</a>
                    {(tag.fullName !== null)
                      ?<div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1 bg-white border-2 border-black shadow-lg drop-shadow-lg rounded-lg opacity-0 display-none group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <p className="px-3 py-2 font-thin text-sm">{tag.fullName}</p>
                      </div>
                    :<div/>}
                  </div>
                ))}
              </div>
              <div className='overflow-hidden rounded-3xl'>
                <img src={project.image} alt={project.title} className='w-full max-h-[300px] min-h-[100px] object-contain rounded-lg'/>
              </div>
              <a href={project.url} className='absolute top-0 right-0 p-2'>
                <img className='text-black font-poppins text-xs underline rounded-md p-1 shadow-md drop-shadow-md' src={github} style={{background: hexRgbLightner(project.color, 0.2)}}/>
              </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;