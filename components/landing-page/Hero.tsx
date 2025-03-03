import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef(null);
  const partnersRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    )
    .fromTo(
      featuresRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.1"
    )
    .fromTo(
      partnersRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    )
    .fromTo(
      imageRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1 },
      "-=0.8"
    );
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="mt-32 mx-auto px-32 h-full flex flex-col lg:flex-row items-center justify-between py-16 lg:py-0">
        <div className="w-full lg:w-1/2 text-center lg:text-left z-10 mt-8 lg:mt-0">
          <div ref={titleRef}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="text-blue-400">慧与</span>医院管理系统
            </h1>
            <div className="mt-2 flex items-center justify-center lg:justify-start">
              <span className="px-3 py-1 text-sm text-blue-300 bg-blue-900/50 rounded-full">智慧医疗 · 便捷服务</span>
            </div>
          </div>
          
          <div ref={descriptionRef} className="mt-6 text-lg text-gray-300 max-w-lg mx-auto lg:mx-0">
            <p>
              全方位医院智能管理平台，连接患者、医生与管理员。
              预约挂号、AI智能问诊、科室管理一站式解决方案。提升医疗效率，优化患者体验。
            </p>
          </div>
          
          <div ref={featuresRef} className="mt-20 pr-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium">患者管理</h3>
                </div>
                <p className="text-sm text-gray-400">自助注册、个人档案、预约跟踪、治疗记录</p>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium">AI医疗助手</h3>
                </div>
                <p className="text-sm text-gray-400">智能问诊、健康建议、用药提醒、健康知识</p>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium">在线预约</h3>
                </div>
                <p className="text-sm text-gray-400">实时可用时间、专科筛选、预约管理、提醒服务</p>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium">数据分析</h3>
                </div>
                <p className="text-sm text-gray-400">运营数据、医疗趋势、患者满意度、资源优化</p>
              </div>
            </div>
          </div>
          
          <div ref={ctaRef} className="mt-20 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 transform hover:-translate-y-1 font-medium">
              预约挂号
            </button>
            <button className="px-8 py-4 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-900/30 transition duration-300 font-medium">
              了解详情
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">1000+</div>
              <div className="text-sm text-gray-400">注册医生</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-400">专业科室</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">98%</div>
              <div className="text-sm text-gray-400">满意度</div>
            </div>
          </div>
        </div>
        
        <div ref={imageRef} className="w-full lg:w-1/2 mt-12 lg:mt-0 z-10">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-24 right-20 w-32 h-32 bg-cyan-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
            
            <Image 
              src="/assets/images/tips.jpg" 
              alt="医院管理系统界面展示" 
              width={600}
              height={400}
              className="relative rounded-xl shadow-2xl max-w-full mx-auto transform hover:scale-105 transition duration-500 border border-gray-800"
            />
            
            <div className="absolute -right-4 top-1/4 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-200">AI 医生在线</span>
              </div>
            </div>
            
            <div className="absolute -left-4 bottom-1/4 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-200">预约成功</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#1e40af" 
            fillOpacity="0.1" 
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;