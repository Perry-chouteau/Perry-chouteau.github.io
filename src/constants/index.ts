import { link } from 'fs';
import {
  /* Company */
  epitech,
  paykrom,
  xo7,
  keimyung,
  ds,

  /* Application */
  github,
  gitlab,
  linkedin,
  
  figma,
  slack,
  docker,

  qemu,
  k8s,
  cilium,
  knative,

  /* version Control */
  git,
  aws,

  /* Languages */
  c,
  cpp,
  golang,
  haskell,
  flutter,
  typescript,
  python,
  arduino,
  java,

  /* Library & framework */
  express,
  react,
  tailwindcss,
  prisma,
  grpc,

  /* Database */
  mongodb,
  mysql,
  autocad,
  lightroom,
} from '../assets/icons';

import { 
  perry,
  perry_cpp,
  getout,
  portfolio,
  image_compressor
} from '../assets/images';

import type { Vector2, Coordinate } from './voyage';
import { coordinates } from './voyage';

export interface Skill {
  imageUrl: string;
  name: string;
  type: string;
}

export const skills = [
    /* Languages */
  {
    imageUrl: c,
    name: 'C',
    type: 'Software',
    url: 'https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.html'
  },
  {
    imageUrl: cpp,
    name: 'C++',
    type: 'Software',
    url: 'https://isocpp.org/'
  },
  {
    imageUrl: golang,
    name: 'Golang',
    type: 'Backend',
    url: 'https://golang.org/'
  },
  {
    imageUrl: flutter,
    name: 'Flutter & Dart',
    type: 'Mobile',
    url: 'https://flutter.dev/'
  },
  {
    imageUrl: typescript,
    name: 'Typescript',
    type: 'Web',
    url: 'https://www.typescriptlang.org/'
  },
  {
    imageUrl: haskell,
    name: 'Haskell',
    type: 'Software',
    url: 'https://www.haskell.org/'
  },
  {
    imageUrl: python,
    name: 'Python',
    type: 'Software',
    url: 'https://www.python.org/'
  },
  {
    imageUrl: java,
    name: 'Java',
    type: 'Mobile',
    url: 'https://www.java.com/'
  },
  /* Application*/
  {
    imageUrl: git,
    name: 'Git',
    type: 'Versioning',
    url: 'https://git-scm.com/'
  },
  /* Library & framework */
  {
    imageUrl: mysql,
    name: 'Mysql',
    type: 'Database',
    url: 'https://www.mysql.com/'
  },
  {
    imageUrl: mongodb,
    name: 'Mongodb',
    type: 'Database',
    url: 'https://www.mongodb.com/'
  },
    {
    imageUrl: qemu,
    name: 'Qemu',
    type: 'Emulator',
    url: 'https://qemu.org/'
  },
  {
    imageUrl: docker,
    name: 'Docker',
    type: 'Container',
    url: 'http://docker.com/'
  },
  {
    imageUrl: aws,
    name: 'AWS',
    type: 'Cloud',
    url: 'https://aws.amazon.com/'
  },
  {
    imageUrl: k8s,
    name: 'Kubernetes',
    type: '25%...',
    url: 'https://kubernetes.io/'
  },
  {
    imageUrl: cilium,
    name: 'Cilium',
    type: '1%',
    url: 'https://cilium.io/'
  },
  {
    imageUrl: knative,
    name: 'Knative',
    type: '0%',
    url: 'https://knative.dev/'
  }

];

export interface Experience {
  title: string;
  company_name: string;
  location: string;
  icon: string;
  iconBG: string;
  date: string;
  description: string | null;
  points: string[];
}

export const experiences = [
    {
      'title': 'Software Engineer Expert',
      'company_name': 'Dassault Système',
      'location': 'Paris, France',
      'icon' : ds,
      'iconBG': '#215282',
      'date': 'March 2025 - August 2025',
      'description': 'Edit the import workflow on cannonical periodic surfaces.',
      'points': [
        "Geometrical import",
        "Software Engineering",
        "Improve reliability models",
      ]
    },

    {
      'title': 'Computer Science',
      'company_name': 'Keimyung',
      'location': 'Daegu, Korea',
      'icon' : keimyung,
      'iconBG': '#1v4d9c',
      'date': 'September 2023 - July 2024 · 1 year',
      'description': 'Worked on the Google Search Engine',
      'points': [
        "Learning computer science (opengl, physics).",
        "Want to add a physical engine (associated with the ECS engine https://github.com/P-E-R-R-Y/ecs."
      ]
    },
    {
      'title': 'Backend, DevOps Developer',
      'company_name': 'Xo7',
      'location': 'Paris, France',
      'icon' : xo7,
      'iconBG': '#000000',
      'date': 'January 2023 - June 2023 · 6 months',
      'description': 'Improve accessibility to deploy a complex CMS architecture',
      'points': [
        "AWS EC2, S3, Lambda, Gateway, SSM, CloudWatch, SSM",
        "Gitlab CI/CD API",
        "Slack API & Block",
      ]
    },
    {
      'title': 'Freelance Developer',
      'company_name': 'Freelance',
      'location': 'Paris, France',
      'icon' : paykrom,
      'iconBG': '#ea6e2d',
      'date': 'January 2022 - April 2022 · 4 months',
      'description': 'Build a mobile app using Java',
      'points': [
        "Continuing the project with Paykrom",
        "Implementing more features",
      ]
    },
    {
      'title': 'Internship Mobile Developer',
      'company_name': 'Paykrom',
      'location': 'Paris, France',
      'icon' : paykrom,
      'iconBG': '#ea6e2d',
      'date': 'September 2021 - December 2021',
      'description': 'Paykrom is a payment service provider agent.',
      'points': [
        "Learn Android development",
        "Build a mobile application from scratch",
        "Leading the new UI collaborating with the designer",
        "Working with AWS Cognito",
      ]
    },
    {
    'title': 'Software Engineer Expert',
    'company_name': 'Epitech',
    'location': 'Paris, France',
    'icon' : epitech,
    'iconBG': '#008fcd',
    'date': 'September 2020 - Currently',
    'description': 'Pedagogy emphasizes learning by doing.',
    'points': [
      "System Information Architecture",
      "Software Engineering",
      "Network, Security & DevOps",
    ]
  },
];

export interface Tag {
  name: string;
  fullName: string | null;
  url: string;
};

export const tags = {
  'ecs':{
    name: 'ECS',
    fullName: 'Entity Component System',
    url: 'https://en.wikipedia.org/wiki/Entity_component_system',
  },
  'microservice': {
    name: 'microservice',
    fullName: null,
    url: ''
  },
  'cross':{
    name: 'crossplateforme',
    fullName: null,
    url: 'https://en.wikipedia.org/wiki/Cross-platform'
  },
  'staticLib':{
    name: 'staticLib',
    fullName: 'Static Library',
    url: 'https://en.wikipedia.org/wiki/Library_(computing)'
  },
  'sharedLib':{
    name: 'sharedLib',
    fullName: 'Shared Library',
    url: 'https://en.wikipedia.org/wiki/Library_(computing)'
  },
  'web':{
    name: 'web',
    fullName: null,
    url: 'https://en.wikipedia.org/wiki/Web'
  },
  'mobile':{
    name: 'mobile',
    fullName: null,
    url: 'https://en.wikipedia.org/wiki/Mobile_app'
  },
  'desktop':{
    name: 'desktop',
    fullName: null,
    url: 'https://en.wikipedia.org/wiki/Desktop_computer'
  },
  'game':{
    name: 'game',
    fullName: null,
    url: 'https://en.wikipedia.org/wiki/Video_game'
  },
  'api':{
    name: 'api',
    fullName: null,
    url: 'https://en.wikipedia.org/wiki/API'
  },
  'database':{
    name: 'database',
    fullName: null,
    url: 'https://en.wikipedia.org/wiki/Database'
  },
  'aws':{
    name: 'aws',
    fullName: 'Amazon Web Services',
    url: 'https://en.wikipedia.org/wiki/Amazon_Web_Services'
  },
  'ci-cd':{
    name: 'ci-cd',
    fullName: 'Continuous Integration and Continuous Deployment',
    url: 'https://en.wikipedia.org/wiki/CI/CD'
  },
  'devops':{
    name: 'devops',
    fullName: 'Development and Operations',
    url: 'https://en.wikipedia.org/wiki/DevOps'
  },
  'algorithm':{
    name: 'algorithm',
    fullName: null,
    url: 'https://en.wikipedia.org/wiki/Algorithm'
  },
  'ui': {
    name: 'ui',
    fullName: 'User Interface',
    url: 'https://en.wikipedia.org/wiki/User_interface'
  },
  'ux': {
    name: 'ux',
    fullName: 'User Experience',
    url: 'https://en.wikipedia.org/wiki/User_experience'
  }
}

export interface Project {
  title: string;
  description: string;
  tags: Tag[];
  image: string;
  url: string | undefined;
  color: string;
}

export const projects = [
  {
    'title': 'PERRY',
    'description': 'The goal is to create applications without dependencies merging a lot of knowledge.',
    'tags': [tags.ecs, tags.cross, tags.sharedLib],
    'image': perry_cpp,
    'url': 'https://github.com/Perry-Chouteau/Perry',
    'color': '#ffc800',
  },
  {
    'title': 'Image Compressor',
    'description': 'Compress image with specific format',
    'tags': [tags.algorithm],
    'image': image_compressor,
    'url': 'https://github.com/Perry-Chouteau',
    'color': '#8000ff',
  },
  {
    'title': 'Getout',
    'description': 'Create a application, sharing alternative to social media',
    'tags': [tags.mobile, tags.algorithm, tags.ui, tags.ux],
    'image': getout,
    'url': undefined,
    'color': '#f0430e',
  },
  {
    'title': 'Portfolio',
    'description': 'Your\'re already looking at it',
    'tags': [tags.mobile, tags.ui, tags.ux],
    'image': portfolio,
    'url': 'github.com/Perry-Chouteau/Portfolio',
    'color': '#0e86f0',
  },
];

export { type Vector2, type Coordinate, coordinates};