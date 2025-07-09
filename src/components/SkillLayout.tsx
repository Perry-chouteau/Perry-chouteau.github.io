import { Skill } from '../constants';

const SkillLayout = ({skills}:{skills: Skill[]}) => {
    return (
        <div className='#skills py-10 flex flex-col'>
            <h3 className='subhead-text'>Technical Skills</h3>

            <div className='mt-16 flex flex-wrap gap-8 justify-center items-center'>
            {skills.map((skill: Skill) => (
                <div className='justify-center items-center'>
                {/*icon*/}
                <div className='block-container red w-12 h-12 sm:w-20 sm:h-20 mb-3'>
                    <div className='btn-back rounded-xl' />
                    <div className='btn-front rounded-xl flex justify-center items-center'>
                    <img
                        src={skill.imageUrl}
                        alt={skill.name}
                        className='w-[75%] h-[75%] object-contain'
                    />
                    </div>
                </div>
                {/*name*/}
                <p className='text-center text-black-500 text-[10px] sm:text-xs font-light font-poppins self-center'>{skill.name}</p>
                <p className='text-center text-black-500 text-[10px] sm:text-xs font-extralight font-poppins self-center'>{skill.type}</p>
                </div>
            ))/*.sort((a, b) => 0.5 - Math.random())*/}
            </div>
        </div>
    )
}

export default SkillLayout;