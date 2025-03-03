import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 确保注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featureRefs = useRef([]);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  // 添加到refs数组的辅助函数
  const addToRefs = (el) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  useEffect(() => {
    // 标题动画
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 特色项目逐个触发动画
    featureRefs.current.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: feature,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 图片动画
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 统计数字动画
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      featureRefs.current = [];
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-gray-900"
      id="features"
    >
      <div className="mx-auto px-32">
        {/* 标题部分 */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="px-3 py-1 text-sm text-blue-300 bg-blue-900/30 rounded-full">
            医院特色服务
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white">慧与医院智能化特色</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            我们运用前沿科技，为医疗服务赋能，打造智慧医疗新体验，提升医患双方的服务效率与满意度
          </p>
        </div>

        {/* 特色展示区 - 使用卡片和图片交替布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 左侧特色卡片 */}
          <div className="space-y-8">
            <div 
              ref={addToRefs} 
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">智能预约系统</h3>
                  <p className="text-gray-400">
                    基于人工智能的智能排班和预约系统，根据医生专长、患者需求和历史数据，优化医疗资源分配，减少患者等待时间，提高就诊体验。
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      实时显示医生出诊时间
                    </li>
                    <li className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      智能推荐最适合的医生
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div 
              ref={addToRefs} 
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI辅助诊断</h3>
                  <p className="text-gray-400">
                    利用深度学习算法分析医学影像和患者数据，为医生提供辅助诊断建议，提高诊断准确率和效率，同时降低误诊风险。
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      医学影像智能分析
                    </li>
                    <li className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      病历数据辅助诊断
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧图片 */}
          <div ref={imageRef} className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-radial from-blue-600/20 to-transparent rounded-full opacity-40"></div>
            <img 
              src="/assets/images/tips.jpg" 
              alt="医院智能化特色展示" 
              className="relative z-10 rounded-xl shadow-2xl border border-gray-700"
            />
            <div className="absolute -top-5 -right-5 bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700 z-20">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white">诊断准确率提升30%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 第二行特色展示 - 图片在左，卡片在右 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 左侧图片 */}
          <div ref={addToRefs} className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-radial from-purple-600/20 to-transparent rounded-full opacity-40"></div>
            <img 
              src="/assets/images/tips.jpg" 
              alt="电子病历与数据管理" 
              className="relative z-10 rounded-xl shadow-2xl border border-gray-700"
            />
            <div className="absolute -bottom-5 -left-5 bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700 z-20">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium text-white">工作效率提升50%</span>
              </div>
            </div>
          </div>

          {/* 右侧特色卡片 */}
          <div className="space-y-8 order-1 lg:order-2">
            <div 
              ref={addToRefs} 
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">电子病历系统</h3>
                  <p className="text-gray-400">
                    完整的电子病历管理系统，实时记录患者诊疗信息，支持多端访问和权限控制，确保医疗数据的安全性和完整性。
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      多设备同步访问
                    </li>
                    <li className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      安全加密存储
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div 
              ref={addToRefs} 
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-green-900/50 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">智能随访系统</h3>
                  <p className="text-gray-400">
                    基于患者病情和治疗方案，自动生成个性化随访计划，通过多渠道提醒患者复诊和用药，提高治疗依从性。
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      智能提醒系统
                    </li>
                    <li className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      个性化随访计划
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div 
          ref={statsRef} 
          className="mt-16 bg-gray-800/50 rounded-2xl p-8 border border-gray-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">系统运行成效</h3>
            <p className="text-gray-400 mt-2">通过智能化管理，我们实现了医疗服务的质量和效率双提升</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-sm text-gray-500">患者满意度</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">-40%</div>
              <div className="text-sm text-gray-500">平均等待时间</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">+35%</div>
              <div className="text-sm text-gray-500">医生工作效率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">500K+</div>
              <div className="text-sm text-gray-500">每月服务患者</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;