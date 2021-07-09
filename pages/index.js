import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import Project from './../components/Project.js'
import { init } from 'ityped'
import { IoRocket, IoLogoGithub } from "react-icons/io5"
import brewmate_icon from './../assets/brewmate.png'
import vybot_icon from './../assets/vybot.png'
import gol_icon from './../assets/gol.png'
import bm_icon from './../assets/mailer-logo.png'
import { getAllCommandAlias, getAllProjects, getCommandOutput } from './../lib/api.js'

const tech = [
  'React', 'MySQL', 'MongoDB',
  'Node', 'Python', 'GraphQL',
  'AWS', 'WordPress', 'PHP'
]

const loadingFrames = [...new Array(5).fill('▄▄▄▄'), '■▄▄▄', '▀■▄▄', '■▀■▄', '▄■▀■', '▄▄■▀', '▄▄▄■']

export default function Home() {
  const loader = useRef({ loading: false, step: 0, timer: null })
  const typing = useRef(false)
  const terminalDiv = useRef()
  const cmdInputDiv = useRef()

  useEffect(() => {
    cmdInputDiv.current.value = 'intro'
    submitCommand()
  }, [])

  function toggleLoading(val) {
    loader.current.step = 0

    try {
      if (val) {
        loader.current.loading = true
        loader.current.timer = setInterval(() => {
          if (!terminalDiv.current)
            return
          const i = loader.current.step
          terminalDiv.current.innerHTML = loadingFrames[i]
          loader.current.step = (i + 1) % loadingFrames.length
        }, 100);
      } else {
        loader.current.loading = false
        clearInterval(loader.current.timer)
        terminalDiv.current.innerHTML = ''
      }
    } catch (err) {
      console.log(err)
    }
  }

  function outputToTerminal(output) {
    const el = output.shift()
    const id = 'terminal-output-' + output.length

    // TODO: parse line by line and create html elements accordingly

    try {
      switch ((typeof el).toLowerCase()) {
        case 'string':
          const p = document.createElement('p')

          p.id = id
          p.className = 'mb-2'
          terminalDiv.current.appendChild(p);
          init(document.querySelector('#' + id), {
            showCursor: false,
            strings: [el],
            loop: false,
            typeSpeed: 5,
            startDelay: 0,
            onFinished: function () {
              if (output.length > 0) {
                if (!loader.current.loading)
                  outputToTerminal(output)
              } else {
                typing.current = false
                terminalDiv.current.innerHTML = terminalDiv.current.innerHTML.replaceAll(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                  '<a class="underline" target="_blank" href="$&">$&</a>')
              }
            }
          })
          break;
        case 'object':
          const ul = document.createElement('ul')

          ul.id = id
          ul.className = 'grid grid-cols-3 gap-0 mx-auto pl-4 mb-2'
          terminalDiv.current.appendChild(ul)

          el.map((e, i) => {
            const li = document.createElement('li')
            li.id = id + '-' + i

            const sp = document.createElement('span')
            sp.appendChild(li)
            ul.appendChild(sp)
          })

          for (let i = 0; i < el.length; i++) {
            init(document.querySelector('#' + id + '-' + i), {
              showCursor: false,
              strings: [el[i]],
              loop: false,
              typeSpeed: 50,
              startDelay: i * 100,
              onFinished: function () {
                if (i === el.length - 1) {
                  if (output.length > 0)
                    outputToTerminal(output)
                  else
                    typing.current = false
                }
              }
            })
          }
          break;
        default:
          return
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function submitCommand(event) {
    if (event?.preventDefault)
      event.preventDefault()

    if (cmdInputDiv.current.value.match(/^\s*$/))
      return

    if (!typing.current && !loader.current.loading) {
      toggleLoading(true)

      const cmd = cmdInputDiv.current.value
      let output = []
      cmdInputDiv.current.value = ""

      switch (cmd.toLowerCase()) {
        case 'help':
          let allAlias = await getAllCommandAlias()
          output.push('Below is a list of available commands:')
          allAlias.map(entry => {
            output.push('> '.concat(entry.node.slug))
          })
          break
        case 'intro':
          output = ["CSUF graduate with a bachelor's degree in computer science plus various extra-curricular activities in full-stack web development, video game development, and tutoring for math, computer science, and physics.", 'Some recent tech I’m using:', tech]
          break
        default:
          const rawOutput = await getCommandOutput(cmd)
          output = rawOutput ? rawOutput.split(/[(\n)(\r)]/).filter(Boolean) : ['⚠ Invalid command ⚠', 'Run "help" to see all available commands.']
      }

      setTimeout(() => {
        typing.current = true
        toggleLoading(false)
        outputToTerminal(output)
      }, (Math.random()*3+2)*1000)

    } else {
      cmdInputDiv.current.value = ""
    }
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap"
          rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Damien Mousavi | Private Tutor, Web Developer." />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        <title>Damien Saavi</title>
      </Head>
      <main className={`root text-gray-200 h-screen`}>
        <div className='intro-container flex flex-col relative md:flex-row justify-center items-center gap-4 md:gap-8 h-full min-h-sm w-full px-4 pb-16 overflow-hidden'>
          <div className='intro-name text-center md:text-left flex flex-col text-shadow z-10'>
            <p className='text-left opacity-90'>Hello👋🏽 I'm</p>
            <p className='text-4xl xs:text-5xl md:text-6xl font-extrabold'>Damien <br className='hidden md:block' />Mousavi</p>
            <p className='text-lg opacity-90'>Private Tutor | Web developer</p>
          </div>

          <div className='bg-sphere absolute rounded-full z-0 md:mr-72 transform md:-rotate-135' />

          <div className='terminal relative flex flex-col text-sm md:text-base w-full max-w-lg h-1/2 max-h-102 md:h-96 shadow-3xl'>
            <div className='terminal-bar relative text-xs flex justify-start h-8 py-2'>
              <div className='h-4 w-4 rounded-full ml-2 flex-shrink-0 btn-exit'></div>
              <div className='h-4 w-4 rounded-full ml-2 flex-shrink-0 btn-min'></div>
              <div className='h-4 w-4 rounded-full ml-2 flex-shrink-0 btn-max'></div>
              <span className='absolute w-full text-center'>Terminal</span>
            </div>
            <div className='terminal-console overflow-y-auto p-2 flex-grow'>
              <div ref={terminalDiv} className='w-full opacity-80 pb-8' id='terminal-output'>
              </div>
            </div>
            <div className='h-14' />
            <div className='cmdline-container flex flex-row justify-between gap-2 absolute bottom-0 w-full p-2'>
              <form className='cmdline flex p-2 gap-2 w-full' action='#' onSubmit={(event) => { submitCommand(event) }}>
                <p className='intro-launch opacity-90'>{'>'}</p>
                <input ref={cmdInputDiv} type='text' className='w-full' id='shell' autoComplete='off' placeholder="try 'terminal' or 'help'" />
                <input type="submit" className="hidden" />
              </form>
              {/* <button></button> */}
            </div>
          </div>
        </div >

        <div className='projects-container mx-auto max-w-lg sm:max-w-3xl -mt-20 p-2'>
          <p className='text-4xl flex justify-center Z-10 text-shadow'>Projects<IoRocket className='ml-1 w-6' /></p>
          <hr className='mt-0 mb-12 w-3/4 mx-auto' />
          {/* TODO: use a loop to render wp api response instead */}

          <div className='relative'>
            <div className='hidden sm:block bg-main-light opacity-50 absolute h-full w-1 left-1/2 z-0'></div>
            <Project index={0}>
              <Project.Logo src={brewmate_icon} />
              <Project.Description title='Cheftmate'>
                A simple no-nonsense recipe app.
                <ul className='features pl-8'>
                  <li>Step-by-step recipe walkthrough.</li>
                  <li>Create and modify your own recipes.</li>
                  <li>Save your recipes to the cloud and access them on another device.</li>
                </ul>
                <Project.ButtonBar>
                  <Project.Button href='https://github.com/DamienSaavi/brewmate'>
                    GitHub<IoLogoGithub className='ml-1 inline w-4 h-4 align-baseline' />
                  </Project.Button>
                </Project.ButtonBar>
              </Project.Description>
            </Project>

            <Project index={1}>
              <Project.Logo src={vybot_icon} />
              <Project.Description title='VyBot'>
                Discord music bot with extensive features.
                <ul className='features pl-8'>
                  <li>Create playlists using keywords or Youtube links</li>
                  <li>Save playlist to cloud and play anytime.</li>
                  <li>Shuffle and modify queue.</li>
                  <li>Intuitive text-based UI.</li>
                </ul>

                <Project.ButtonBar>
                  <Project.Button href='https://github.com/DamienSaavi/vybot'>
                    GitHub<IoLogoGithub className='ml-1 inline w-4 h-4 align-baseline' />
                  </Project.Button>
                  <Project.Button href='https://discord.com/api/oauth2/authorize?client_id=679935364030660646&permissions=3155968&scope=bot'>
                    Try it!
                  </Project.Button>
                </Project.ButtonBar>
              </Project.Description>
            </Project>

            <Project index={2}>
              <Project.Logo src={bm_icon} />
              <Project.Description title='Budget Mailer'>
                A mailchimp clone.
                <ul className='features pl-8'>
                  <li>Rich text editor providing more freedom than most email services.</li>
                  <li>Send properly formatted emails and newsletters to multiple contacts.</li>
                  <li>Create and store contact list.</li>
                </ul>
                <Project.ButtonBar>
                  <Project.Button href='https://github.com/DamienSaavi/budget-mailer'>
                    GitHub<IoLogoGithub className='ml-1 inline w-4 h-4 align-baseline' />
                  </Project.Button>
                </Project.ButtonBar>
              </Project.Description>
            </Project>

            <Project index={3}>
              <Project.Logo src={gol_icon} />
              <Project.Description title='Lazy Game of Life'>
                Conway's Game of Life with a "lazy" update function implementation to boost performance.
                <Project.ButtonBar>
                  <Project.Button href='https://github.com/DamienSaavi/lazy-game-of-life'>
                    GitHub<IoLogoGithub className='ml-1 inline w-4 h-4 align-baseline' />
                  </Project.Button>
                  <Project.Button href='https://damiensaavi.github.io/lazy-game-of-life'>
                    Try it!
                  </Project.Button>
                </Project.ButtonBar>
              </Project.Description>
            </Project>


            <div className='flex h-18 w-60 mx-auto p-4 justify-center bg-main-light z-20 rounded-xl'>
              <a className='w-48 text-black text-center transform border-coa-dark bg-coa border-b-4 hover:bg-coa-highlight active:border-b-2 active:translate-y-0.5 active:mt-0.5 rounded-xl px-3 py-2.5 align-center' href='https://github.com/DamienSaavi?tab=repositories'>More on GitHub<IoLogoGithub className='ml-1 inline align-baseline' /></a>
            </div>
          </div>
        </div>
        <div className='h-16'></div>
        <footer className='text-sm  transition-all hover:text-coa transform hover:-translate-y-1 text-center p-2 pb-8'><a href='https://github.com/DamienSaavi/Portfolio'>Designed and built by Damien Mousavi</a></footer>
      </main >
    </>
  )
}

export async function getStaticProps() {
  const allProjects = await getAllProjects()
  const allAlias = await getAllCommandAlias()

  return {
    props: {
      allProjects,
      allAlias
    }
  }
}