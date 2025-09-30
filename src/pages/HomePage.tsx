import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, CheckCircleIcon, CalendarIcon, BarChartIcon, ShieldIcon, UserIcon, LockIcon, AwardIcon, TagIcon, FolderIcon, UsersIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon, XIcon, EyeOffIcon, EyeIcon, ThumbsUpIcon } from 'lucide-react';
const HomePage = () => {
  return <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-black">
                DOCUMENT YOUR WINS. ADVANCE YOUR CAREER.
              </h1>
              <p className="text-xl md:text-2xl text-black mb-8 font-bold">
                Brag Book helps you track professional achievements, get
                recognized, and leverage your accomplishments when it matters
                most.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-none text-white bg-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] transition-all">
                  Get Started Free
                </Link>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-none text-black bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] transition-all">
                  See Features
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative -rotate-2 transform">
              <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="Brag Book Dashboard" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-500 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Social Proof */}
      <div className="bg-white py-8 border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-black text-sm font-bold">
            TRUSTED BY PROFESSIONALS AT
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6">
            <div className="col-span-1 flex justify-center md:col-span-1">
              <img className="h-8" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <img className="h-8" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <img className="h-8" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <img className="h-8" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Transistor" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <img className="h-8" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Workcation" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <img className="h-8" src="https://tailwindui.com/img/logos/laravel-logo-gray-400.svg" alt="Laravel" />
            </div>
          </div>
        </div>
      </div>
      {/* Feature Section */}
      <div id="features" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
              EVERYTHING YOU NEED TO TRACK AND SHOWCASE YOUR ACCOMPLISHMENTS
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-black mx-auto font-medium">
              Brag Book makes it easy to document your professional wins,
              organize them, and leverage them for performance reviews, job
              applications, and more.
            </p>
          </div>
          {/* Achievement Tracking */}
          <div className="mb-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="mb-10 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-none bg-cyan-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mr-4">
                    <AwardIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black text-black">
                    ACHIEVEMENT TRACKING
                  </h3>
                </div>
                <p className="text-lg text-black mb-6 font-medium">
                  Log all your professional wins, feedback, and milestones in
                  one organized place. Never forget a key accomplishment again.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Record achievements with rich text descriptions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Add metrics and impact details
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Attach supporting documents and images
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative lg:pl-10 rotate-1">
                <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-4">
                    <div className="bg-white rounded-none border-4 border-black overflow-hidden">
                      <div className="h-32 bg-pink-400 flex items-center justify-center">
                        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="Achievement tracking interface" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-none text-sm font-bold bg-green-400 text-black border-2 border-black">
                            Project Win
                          </span>
                          <div className="flex space-x-2">
                            <UsersIcon className="h-5 w-5 text-black" />
                            <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-black mb-1">
                          Successfully launched Q3 marketing campaign
                        </h3>
                        <p className="text-sm text-black mb-3 line-clamp-3">
                          Led the team in designing and executing our Q3
                          marketing campaign, which exceeded conversion targets
                          by 27%.
                        </p>
                        <div className="flex items-center justify-between text-xs text-black">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>Sep 15, 2023</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-yellow-300 px-2 py-1 rounded-none border-2 border-black">
                              marketing
                            </span>
                            <span className="bg-yellow-300 px-2 py-1 rounded-none border-2 border-black">
                              leadership
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-500 z-0"></div>
              </div>
            </div>
          </div>
          {/* Visual Timeline */}
          <div className="mb-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="relative order-last lg:order-first lg:pr-10 mb-10 lg:mb-0 -rotate-1">
                <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                      <button className="p-1 rounded-none text-black bg-yellow-300 border-2 border-black">
                        <ChevronLeftIcon className="h-6 w-6" />
                      </button>
                      <div className="flex items-center">
                        <h2 className="text-xl font-bold text-black">
                          September 2023
                        </h2>
                      </div>
                      <button className="p-1 rounded-none text-black bg-yellow-300 border-2 border-black">
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-none bg-cyan-400 border-2 border-black flex items-center justify-center text-black font-bold">
                            15
                          </div>
                          <div className="ml-4 text-sm font-bold text-black">
                            Wednesday
                          </div>
                        </div>
                        <div className="mt-2 ml-14 space-y-3">
                          <div className="p-3 rounded-none bg-green-400 border-2 border-black">
                            <div className="flex justify-between items-start">
                              <h3 className="text-black font-bold text-sm">
                                Successfully launched Q3 marketing campaign
                              </h3>
                              <div className="text-xs text-black font-medium">
                                Sep 15
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-none bg-cyan-400 border-2 border-black flex items-center justify-center text-black font-bold">
                            10
                          </div>
                          <div className="ml-4 text-sm font-bold text-black">
                            Friday
                          </div>
                        </div>
                        <div className="mt-2 ml-14 space-y-3">
                          <div className="p-3 rounded-none bg-purple-400 border-2 border-black">
                            <div className="flex justify-between items-start">
                              <h3 className="text-black font-bold text-sm">
                                Completed Advanced Analytics Certification
                              </h3>
                              <div className="text-xs text-black font-medium">
                                Sep 10
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 z-0"></div>
              </div>
              <div className="order-first lg:order-last">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-none bg-pink-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mr-4">
                    <CalendarIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black text-black">
                    VISUAL TIMELINE
                  </h3>
                </div>
                <p className="text-lg text-black mb-6 font-medium">
                  View your achievements in a beautiful timeline format by day,
                  month, or year to track your growth and identify patterns.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Visualize progress over time
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Filter timeline by category or tag
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Identify periods of high achievement
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Smart Categorization */}
          <div className="mb-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="mb-10 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-none bg-yellow-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mr-4">
                    <FolderIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black text-black">
                    SMART CATEGORIZATION
                  </h3>
                </div>
                <p className="text-lg text-black mb-6 font-medium">
                  Organize achievements by category and subcategory to quickly
                  find and showcase relevant accomplishments.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Predefined professional categories
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Custom subcategories for your unique needs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Quick filtering and sorting
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative lg:pl-10 rotate-1">
                <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-5">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-black mb-2">
                        Filter Achievements
                      </h3>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon className="h-5 w-5 text-black" />
                        </div>
                        <input type="text" className="block w-full pl-10 py-3 text-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" placeholder="Search achievements..." />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <div>
                        <label htmlFor="category-filter" className="block text-sm font-bold text-black mb-1">
                          Category
                        </label>
                        <select id="category-filter" className="block w-full pl-3 pr-10 py-3 text-black bg-cyan-300 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <option value="all">All Categories</option>
                          <option value="professional">
                            Professional Achievements
                          </option>
                          <option value="recognition">
                            Recognition & Feedback
                          </option>
                          <option value="learning">
                            Learning & Development
                          </option>
                          <option value="milestone">Career Milestones</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="subcategory-filter" className="block text-sm font-bold text-black mb-1">
                          Subcategory
                        </label>
                        <select id="subcategory-filter" className="block w-full pl-3 pr-10 py-3 text-black bg-pink-300 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <option value="all">All Subcategories</option>
                          <option value="project_win">Project Win</option>
                          <option value="process_improvement">
                            Process Improvement
                          </option>
                          <option value="innovation">Innovation</option>
                          <option value="award">Award or Recognition</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-400 z-0"></div>
              </div>
            </div>
          </div>
          {/* Custom Tags */}
          <div className="mb-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="relative order-last lg:order-first lg:pr-10 mb-10 lg:mb-0 -rotate-1">
                <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-5">
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-black mb-2">
                        <div className="flex items-center">
                          <TagIcon className="h-5 w-5 text-black mr-2" />
                          Tags
                        </div>
                      </label>
                      <div className="border-4 border-black rounded-none px-3 py-2 bg-yellow-200">
                        <div className="flex flex-wrap gap-2">
                          <div className="bg-pink-400 text-black text-sm px-3 py-1 rounded-none border-2 border-black flex items-center font-bold">
                            marketing
                            <button className="ml-1 text-black hover:text-gray-700 focus:outline-none">
                              <XIcon className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="bg-pink-400 text-black text-sm px-3 py-1 rounded-none border-2 border-black flex items-center font-bold">
                            leadership
                            <button className="ml-1 text-black hover:text-gray-700 focus:outline-none">
                              <XIcon className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="bg-pink-400 text-black text-sm px-3 py-1 rounded-none border-2 border-black flex items-center font-bold">
                            campaign
                            <button className="ml-1 text-black hover:text-gray-700 focus:outline-none">
                              <XIcon className="h-4 w-4" />
                            </button>
                          </div>
                          <input type="text" className="flex-grow min-w-[120px] outline-none text-sm bg-transparent" placeholder="Add more tags..." />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-black">
                        Add tags to categorize your achievement (e.g., project
                        name, skills used)
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-bold text-black mb-2">
                        Popular Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-cyan-300 text-black text-xs px-2 py-1 rounded-none cursor-pointer hover:bg-cyan-400 border-2 border-black font-bold">
                          presentation
                        </span>
                        <span className="bg-cyan-300 text-black text-xs px-2 py-1 rounded-none cursor-pointer hover:bg-cyan-400 border-2 border-black font-bold">
                          teamwork
                        </span>
                        <span className="bg-cyan-300 text-black text-xs px-2 py-1 rounded-none cursor-pointer hover:bg-cyan-400 border-2 border-black font-bold">
                          client
                        </span>
                        <span className="bg-cyan-300 text-black text-xs px-2 py-1 rounded-none cursor-pointer hover:bg-cyan-400 border-2 border-black font-bold">
                          analytics
                        </span>
                        <span className="bg-cyan-300 text-black text-xs px-2 py-1 rounded-none cursor-pointer hover:bg-cyan-400 border-2 border-black font-bold">
                          design
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-400 z-0"></div>
              </div>
              <div className="order-first lg:order-last">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-none bg-green-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mr-4">
                    <TagIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black text-black">
                    CUSTOM TAGS
                  </h3>
                </div>
                <p className="text-lg text-black mb-6 font-medium">
                  Add custom tags to your achievements to create personalized
                  filtering systems that work for your unique career path.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Create unlimited custom tags
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Tag-based search and filtering
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Track skills and competencies
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Privacy Controls */}
          <div className="mb-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="mb-10 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-none bg-purple-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mr-4">
                    <LockIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black text-black">
                    PRIVACY CONTROLS
                  </h3>
                </div>
                <p className="text-lg text-black mb-6 font-medium">
                  Choose who can see each achievement with flexible privacy
                  settings: private, team-visible, or organization-wide.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Per-achievement privacy settings
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Control visibility to managers and peers
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Selective sharing options
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative lg:pl-10 rotate-1">
                <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-5">
                    <div>
                      <label className="block text-sm font-bold text-black mb-3">
                        <div className="flex items-center">
                          <LockIcon className="h-5 w-5 text-black mr-2" />
                          Privacy Setting
                        </div>
                      </label>
                      <div className="space-y-3 bg-yellow-200 p-4 rounded-none border-4 border-black">
                        <div className="flex items-center">
                          <input id="privacy-private" name="privacy" type="radio" checked className="h-5 w-5 text-black border-black" />
                          <label htmlFor="privacy-private" className="ml-3 block text-sm font-bold text-black">
                            <div className="flex items-center">
                              <EyeOffIcon className="h-5 w-5 text-black mr-2" />
                              Private (Only you)
                            </div>
                            <p className="text-xs text-black mt-1 ml-7 font-medium">
                              Only you can see this achievement
                            </p>
                          </label>
                        </div>
                        <div className="flex items-center pt-2">
                          <input id="privacy-team" name="privacy" type="radio" className="h-5 w-5 text-black border-black" />
                          <label htmlFor="privacy-team" className="ml-3 block text-sm font-bold text-black">
                            <div className="flex items-center">
                              <UsersIcon className="h-5 w-5 text-black mr-2" />
                              Team (Visible to your team members)
                            </div>
                            <p className="text-xs text-black mt-1 ml-7 font-medium">
                              Your team members can see and endorse this
                              achievement
                            </p>
                          </label>
                        </div>
                        <div className="flex items-center pt-2">
                          <input id="privacy-organization" name="privacy" type="radio" className="h-5 w-5 text-black border-black" />
                          <label htmlFor="privacy-organization" className="ml-3 block text-sm font-bold text-black">
                            <div className="flex items-center">
                              <EyeIcon className="h-5 w-5 text-black mr-2" />
                              Organization (Visible to everyone)
                            </div>
                            <p className="text-xs text-black mt-1 ml-7 font-medium">
                              Everyone in your organization can see this
                              achievement
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-500 z-0"></div>
              </div>
            </div>
          </div>
          {/* Endorsements */}
          <div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="relative order-last lg:order-first lg:pr-10 mb-10 lg:mb-0 -rotate-1">
                <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-5">
                    <div className="border-b-4 border-black pb-4 mb-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-black">
                          Successfully launched Q3 marketing campaign
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-none text-sm font-bold bg-green-400 text-black border-2 border-black">
                          Project Win
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-black">
                        Led the team in designing and executing our Q3 marketing
                        campaign, which exceeded conversion targets by 27%.
                      </p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-black flex items-center">
                        <AwardIcon className="h-5 w-5 mr-2 text-black" />
                        Endorsements (2)
                      </h4>
                      <div className="mt-3 space-y-3">
                        <div className="bg-cyan-200 p-3 rounded-none border-2 border-black">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-none bg-yellow-400 flex items-center justify-center text-black font-bold border-2 border-black">
                                JD
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-bold text-black">
                                Jane Doe
                              </p>
                              <p className="text-xs text-black">
                                Marketing Director
                              </p>
                              <p className="mt-1 text-sm text-black">
                                "Emma's leadership on this campaign was
                                outstanding. She coordinated multiple teams and
                                delivered exceptional results."
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-cyan-200 p-3 rounded-none border-2 border-black">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-none bg-green-400 flex items-center justify-center text-black font-bold border-2 border-black">
                                MS
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-bold text-black">
                                Michael Smith
                              </p>
                              <p className="text-xs text-black">
                                Sales Team Lead
                              </p>
                              <p className="mt-1 text-sm text-black">
                                "The leads from this campaign were high quality
                                and helped us exceed our sales targets for Q3.
                                Great work!"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="inline-flex items-center px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-bold rounded-none text-black bg-pink-400 hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <ThumbsUpIcon className="h-5 w-5 mr-2 text-black" />
                        Request Endorsement
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 z-0"></div>
              </div>
              <div className="order-first lg:order-last">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-none bg-cyan-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mr-4">
                    <CheckCircleIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black text-black">
                    ENDORSEMENTS
                  </h3>
                </div>
                <p className="text-lg text-black mb-6 font-medium">
                  Get your achievements validated by peers and leadership to add
                  credibility and weight to your accomplishments.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Request endorsements from colleagues
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Collect testimonials and comments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Build credibility with verified achievements
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* User Personas Section */}
      <div className="py-16 bg-pink-300 border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
              DESIGNED FOR EVERYONE WHO WANTS TO SHOWCASE THEIR IMPACT
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-black mx-auto font-medium">
              Whether you're an employee, freelancer, or part of a brand team,
              Brag Book adapts to your unique needs
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Employee Persona */}
            <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <div className="p-8">
                <div className="w-16 h-16 bg-yellow-400 rounded-none flex items-center justify-center mb-6 border-4 border-black">
                  <UserIcon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-black text-black mb-4">
                  FOR EMPLOYEES
                </h3>
                <p className="text-black mb-6 font-medium">
                  Track your professional growth within your company and stand
                  out during performance reviews and promotion conversations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Document achievements aligned with company goals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Gather endorsements from colleagues and managers
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Generate performance review summaries instantly
                    </span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="Employee using Brag Book" className="rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full h-48 object-cover" />
              </div>
            </div>
            {/* Freelancer Persona */}
            <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              <div className="p-8">
                <div className="w-16 h-16 bg-cyan-400 rounded-none flex items-center justify-center mb-6 border-4 border-black">
                  <BookOpenIcon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-black text-black mb-4">
                  FOR FREELANCERS
                </h3>
                <p className="text-black mb-6 font-medium">
                  Build your personal brand and showcase your portfolio of work
                  across different clients and projects.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Organize achievements by client and project
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Create shareable portfolios for prospective clients
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Track metrics that demonstrate your value
                    </span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="Freelancer using Brag Book" className="rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full h-48 object-cover" />
              </div>
            </div>
            {/* Brand Team Persona */}
            <div className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <div className="p-8">
                <div className="w-16 h-16 bg-green-400 rounded-none flex items-center justify-center mb-6 border-4 border-black">
                  <BarChartIcon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-black text-black mb-4">
                  FOR BRAND TEAMS
                </h3>
                <p className="text-black mb-6 font-medium">
                  Track collective wins, measure team impact, and celebrate
                  successes across marketing campaigns and projects.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Aggregate campaign metrics and results
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Create project retrospectives with team contributions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-black flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-black font-medium">
                      Build case studies from documented achievements
                    </span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="Brand team using Brag Book" className="rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full h-48 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="bg-cyan-300 py-16 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
              LOVED BY PROFESSIONALS AT ALL CAREER STAGES
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <div className="flex items-center mb-4">
                <div className="h-14 w-14 rounded-none bg-yellow-400 flex-shrink-0 overflow-hidden border-4 border-black">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Testimonial author" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-black">
                    Sarah Johnson
                  </h4>
                  <p className="text-black font-medium">Marketing Director</p>
                </div>
              </div>
              <p className="text-black italic font-medium">
                "Brag Book has completely changed how I approach performance
                reviews. I used to struggle remembering my accomplishments, but
                now I have everything documented with context and metrics."
              </p>
            </div>
            <div className="bg-white p-6 rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              <div className="flex items-center mb-4">
                <div className="h-14 w-14 rounded-none bg-pink-400 flex-shrink-0 overflow-hidden border-4 border-black">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Testimonial author" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-black">Michael Chen</h4>
                  <p className="text-black font-medium">Software Engineer</p>
                </div>
              </div>
              <p className="text-black italic font-medium">
                "When I was applying for a promotion, I was able to pull
                specific examples of my impact from Brag Book. It made building
                my case so much easier and more compelling."
              </p>
            </div>
            <div className="bg-white p-6 rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <div className="flex items-center mb-4">
                <div className="h-14 w-14 rounded-none bg-green-400 flex-shrink-0 overflow-hidden border-4 border-black">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Testimonial author" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-black">Alex Rivera</h4>
                  <p className="text-black font-medium">HR Manager</p>
                </div>
              </div>
              <p className="text-black italic font-medium">
                "As an HR professional, I recommend Brag Book to everyone on our
                team. It's made our review process more objective and
                data-driven, which benefits both employees and managers."
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
              SIMPLE, TRANSPARENT PRICING
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-black mx-auto font-medium">
              Choose the plan that's right for you or your team
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border-4 border-black rounded-none p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <h3 className="text-xl font-black text-black mb-2">FREE</h3>
              <p className="text-black mb-4 font-medium">
                Perfect for individuals just getting started
              </p>
              <p className="text-5xl font-black mb-6">$0</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Up to 25 achievements
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Basic categorization
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">Timeline view</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Basic export options
                  </span>
                </li>
              </ul>
              <Link to="/signup" className="block w-full bg-yellow-400 border-4 border-black rounded-none py-3 text-base font-bold text-black text-center hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                GET STARTED
              </Link>
            </div>
            <div className="border-4 border-black rounded-none p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transform -rotate-1">
              <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                <div className="inline-block bg-black rounded-none px-4 py-1 text-base font-bold text-white border-4 border-black">
                  MOST POPULAR
                </div>
              </div>
              <h3 className="text-xl font-black text-black mb-2">PRO</h3>
              <p className="text-black mb-4 font-medium">
                Ideal for employees and freelancers focused on career growth
              </p>
              <p className="text-5xl font-black mb-6">
                $9<span className="text-2xl font-bold text-black">/mo</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Unlimited achievements
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Advanced categorization
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    File attachments
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Personalized portfolios
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Review preparation tools
                  </span>
                </li>
              </ul>
              <Link to="/signup" className="block w-full bg-cyan-400 border-4 border-black rounded-none py-3 text-base font-bold text-black text-center hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                START FREE TRIAL
              </Link>
            </div>
            <div className="border-4 border-black rounded-none p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <h3 className="text-xl font-black text-black mb-2">TEAM</h3>
              <p className="text-black mb-4 font-medium">
                Built for brands and marketing teams to showcase collective
                impact
              </p>
              <p className="text-5xl font-black mb-6">
                $19
                <span className="text-2xl font-bold text-black">/mo</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Everything in Pro
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Team member endorsements
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Campaign analytics
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Project retrospectives
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-black flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-black font-medium">
                    Case study builder
                  </span>
                </li>
              </ul>
              <Link to="/signup" className="block w-full bg-pink-400 border-4 border-black rounded-none py-3 text-base font-bold text-black text-center hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                CONTACT SALES
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                START DOCUMENTING YOUR PROFESSIONAL WINS TODAY
              </h2>
              <p className="mt-4 text-lg text-white font-medium">
                Join thousands of professionals who are taking control of their
                career narrative with Brag Book.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex lg:justify-end">
              <div className="inline-flex">
                <Link to="/signup" className="inline-flex items-center justify-center px-8 py-4 border-4 border-white text-lg font-bold rounded-none text-black bg-yellow-400 hover:translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]">
                  GET STARTED FOR FREE
                </Link>
              </div>
              <div className="ml-4 inline-flex">
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-4 border-white text-lg font-bold rounded-none text-white bg-black hover:translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]">
                  LEARN MORE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-black text-black tracking-wider uppercase">
                PRODUCT
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-black tracking-wider uppercase">
                COMPANY
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-black tracking-wider uppercase">
                RESOURCES
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-black tracking-wider uppercase">
                LEGAL
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-black hover:text-gray-700 font-medium">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t-4 border-black pt-8">
            <p className="text-base text-black text-center font-bold">
              &copy; 2023 BRAG BOOK. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default HomePage;