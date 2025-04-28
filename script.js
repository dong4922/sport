// 语言配置
const translations = {
    zh: {
        title: "久坐提醒",
        logoText: "久坐提醒",
        slogan: "久坐不动，腰酸不已！动一动，活力百倍！",
        notification: "提示: 使用本网站需打开声音功能",
        workSettings: "工作设置",
        workTime: "工作时间",
        breakSettings: "休息设置",
        breakTime: "休息时间",
        timerPrep: "准备开始",
        workingState: "工作中",
        breakingState: "休息中",
        remainingTime: "剩余时间",
        sessionsToday: "今日工作次数",
        breaksToday: "今日休息次数",
        startWork: "开始工作",
        stopWork: "停止工作",
        startBreak: "开始休息",
        stopBreak: "停止休息",
        achievement: "累计起身休息5次, 大大提高颈、肩、腰健康度",
        floatingWorkTitle: "工作计时",
        floatingBreakTitle: "休息计时",
        workComplete: "工作时间结束！该休息一下了。",
        breakComplete: "休息结束！回到工作吧。",
        achievementUnlocked: "恭喜！您已获得健身达人称号！",
        notificationTitle: "久坐提醒",
        continueBreak: "继续休息",
        continueWork: "继续工作",
        confirmButton: "确定",
        stopSound: "停止声音",
        emergencyStopSound: "紧急停止声音",
        emergencyStopMessage: "已尝试停止所有声音。如果您仍然听到声音，请刷新页面或关闭浏览器标签页。",
        testSound: "测试声音",
        alertHeader: "此网页显示",
        // 工作时间选项
        workTimeOptions: {
            "10": "10秒 (演示用)",
            "900": "15分钟",
            "1200": "20分钟",
            "1500": "25分钟",
            "1800": "30分钟",
            "3600": "60分钟"
        },
        // 休息时间选项
        breakTimeOptions: {
            "10": "10秒 (演示用)",
            "180": "3分钟",
            "300": "5分钟",
            "600": "10分钟"
        }
    },
    en: {
        title: "Sitting Reminder",
        logoText: "Sitting Reminder",
        slogan: "Too much sitting is harmful! Move around for better health!",
        notification: "Tip: Please enable sound for this app",
        workSettings: "Work Settings",
        workTime: "Work Duration",
        breakSettings: "Break Settings",
        breakTime: "Break Duration", 
        timerPrep: "Ready to Start",
        workingState: "Working",
        breakingState: "Taking a Break",
        remainingTime: "Time Remaining",
        sessionsToday: "Sessions Today",
        breaksToday: "Breaks Today",
        startWork: "Start Working",
        stopWork: "Stop Working",
        startBreak: "Start Break",
        stopBreak: "Stop Break",
        achievement: "Take 5 breaks to improve your neck, shoulder & back health",
        floatingWorkTitle: "Work Timer",
        floatingBreakTitle: "Break Timer",
        workComplete: "Work time complete! Time for a break.",
        breakComplete: "Break time complete! Back to work.",
        achievementUnlocked: "Congratulations! You've earned the Fitness Expert title!",
        notificationTitle: "Sitting Reminder",
        continueBreak: "Continue Break",
        continueWork: "Continue Work",
        confirmButton: "Confirm",
        stopSound: "Stop Sound",
        emergencyStopSound: "Emergency Stop Sound",
        emergencyStopMessage: "All sounds should be stopped. If you still hear sound, please refresh the page or close the browser tab.",
        testSound: "Test Sound",
        alertHeader: "This page shows",
        // 工作时间选项（英文）
        workTimeOptions: {
            "10": "10 sec (Demo)",
            "900": "15 min",
            "1200": "20 min",
            "1500": "25 min",
            "1800": "30 min",
            "3600": "60 min"
        },
        // 休息时间选项（英文）
        breakTimeOptions: {
            "10": "10 sec (Demo)",
            "180": "3 min",
            "300": "5 min",
            "600": "10 min"
        }
    }
};

// DOM元素
const elements = {
    logoText: document.getElementById('logo-text'),
    languageSelect: document.getElementById('language-select'),
    slogan: document.getElementById('slogan'),
    notificationText: document.getElementById('notification-text'),
    workSettingsTitle: document.getElementById('work-settings-title'),
    workTimeLabel: document.getElementById('work-time-label'),
    breakSettingsTitle: document.getElementById('break-settings-title'),
    breakTimeLabel: document.getElementById('break-time-label'),
    timerTitle: document.getElementById('timer-title'),
    timerLabel: document.getElementById('timer-label'),
    sessionsLabel: document.getElementById('sessions-label'),
    breaksLabel: document.getElementById('breaks-label'),
    startWorkBtn: document.getElementById('start-work-btn'),
    stopWorkBtn: document.getElementById('stop-work-btn'),
    startBreakBtn: document.getElementById('start-break-btn'),
    stopBreakBtn: document.getElementById('stop-break-btn'),
    startWorkText: document.getElementById('start-work-text'),
    stopWorkText: document.getElementById('stop-work-text'),
    startBreakText: document.getElementById('start-break-text'),
    stopBreakText: document.getElementById('stop-break-text'),
    achievementText: document.getElementById('achievement-text'),
    floatingTitle: document.getElementById('floating-title'),
    floatingWindow: document.getElementById('floating-window'),
    sessionsCount: document.getElementById('sessions-count'),
    breaksCount: document.getElementById('breaks-count'),
    timeDisplay: document.getElementById('time-display'),
    floatingTime: document.querySelector('.floating-time'),
    notificationSound: document.getElementById('notification-sound'),
    customAlert: document.getElementById('custom-alert'),
    alertMessage: document.getElementById('alert-message'),
    alertHeader: document.getElementById('alert-header'),
    alertConfirm: document.getElementById('alert-confirm')
};

// 应用状态
const state = {
    currentLanguage: 'zh',
    isWorking: false,
    isBreaking: false,
    workDuration: 10, // 默认10秒（演示用）
    breakDuration: 180, // 默认3分钟
    remainingTime: 0,
    timer: null,
    sessionsCompleted: 0,
    breaksCompleted: 0,
    achievementDots: document.querySelectorAll('.dot'),
    notificationInstance: null,
    soundTimer: null,
    audioContext: null,
    audioNodes: [],
    tempAudioInstances: []
};

// 工具函数
const utils = {
    // 格式化时间（秒 -> mm:ss）
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    // 更新UI文本
    updateTexts: () => {
        const lang = translations[state.currentLanguage];
        document.title = lang.title;
        
        // 更新logo文本
        if (elements.logoText) {
            elements.logoText.textContent = lang.logoText;
        }
        
        elements.slogan.textContent = lang.slogan;
        elements.notificationText.textContent = lang.notification;
        elements.workSettingsTitle.textContent = lang.workSettings;
        elements.workTimeLabel.textContent = lang.workTime;
        elements.breakSettingsTitle.textContent = lang.breakSettings;
        elements.breakTimeLabel.textContent = lang.breakTime;
        elements.timerLabel.textContent = lang.remainingTime;
        elements.sessionsLabel.textContent = lang.sessionsToday;
        elements.breaksLabel.textContent = lang.breaksToday;
        elements.startWorkText.textContent = lang.startWork;
        elements.stopWorkText.textContent = lang.stopWork;
        elements.startBreakText.textContent = lang.startBreak;
        elements.stopBreakText.textContent = lang.stopBreak;
        elements.achievementText.textContent = lang.achievement;
        
        // 更新工作时间选项
        const workTimeSelect = document.getElementById('work-time');
        if (workTimeSelect) {
            for (let option of workTimeSelect.options) {
                if (lang.workTimeOptions[option.value]) {
                    option.textContent = lang.workTimeOptions[option.value];
                }
            }
        }
        
        // 更新休息时间选项
        const breakTimeSelect = document.getElementById('break-time');
        if (breakTimeSelect) {
            for (let option of breakTimeSelect.options) {
                if (lang.breakTimeOptions[option.value]) {
                    option.textContent = lang.breakTimeOptions[option.value];
                }
            }
        }
        
        // 更新按钮文本
        const testSoundBtn = document.getElementById('test-sound');
        if (testSoundBtn) {
            testSoundBtn.textContent = lang.testSound;
        }
        
        const stopSoundBtn = document.getElementById('stop-sound');
        if (stopSoundBtn) {
            stopSoundBtn.textContent = lang.emergencyStopSound;
        }
        
        // 更新对话框文本
        if (elements.alertHeader) {
            elements.alertHeader.textContent = lang.alertHeader;
        }
        
        // 如果当前有显示提示框，更新提示框中的按钮文本
        if (elements.customAlert && !elements.customAlert.classList.contains('hidden')) {
            if (elements.alertConfirm) {
                if (state.isWorking) {
                    elements.alertConfirm.textContent = `${lang.continueBreak} (${lang.stopSound})`;
                } else if (state.isBreaking) {
                    elements.alertConfirm.textContent = lang.continueWork;
                } else {
                    elements.alertConfirm.textContent = lang.confirmButton;
                }
            }
        }
        
        if (state.isWorking) {
            elements.timerTitle.textContent = lang.workingState;
            elements.floatingTitle.textContent = lang.floatingWorkTitle;
        } else if (state.isBreaking) {
            elements.timerTitle.textContent = lang.breakingState;
            elements.floatingTitle.textContent = lang.floatingBreakTitle;
        } else {
            elements.timerTitle.textContent = lang.timerPrep;
        }
    },
    
    // 更新成就点
    updateAchievementDots: () => {
        state.achievementDots.forEach((dot, index) => {
            if (index < state.breaksCompleted) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // 检查是否达成成就
        if (state.breaksCompleted >= 5 && state.achievementDots.length >= 5) {
            utils.showNotification(
                translations[state.currentLanguage].achievementUnlocked,
                { icon: 'success' }
            );
        }
    },
    
    // 显示自定义提示框
    showCustomAlert: (message, callback = null) => {
        console.log("显示自定义提示框:", message);
        
        // 只有在有message参数时才显示提示框
        if (!message) {
            console.error("提示框没有消息内容，不显示");
            return;
        }
        
        // 确保提示框可见
        if (elements.customAlert) {
            elements.customAlert.style.display = "flex";
            elements.alertMessage.textContent = message;
            elements.customAlert.classList.remove('hidden');
            
            // 更新确认按钮文本，添加停止声音的提示
            if (elements.alertConfirm) {
                const lang = translations[state.currentLanguage];
                if (state.isWorking) {
                    // 工作结束有提示音，显示带有停止声音提示的按钮文本
                    elements.alertConfirm.textContent = `${lang.continueBreak} (${lang.stopSound})`;
                } else if (state.isBreaking) {
                    // 休息结束无提示音，只显示简单的继续工作按钮文本
                    elements.alertConfirm.textContent = lang.continueWork;
                } else {
                    // 其他情况（如测试按钮）
                    elements.alertConfirm.textContent = lang.confirmButton;
                }
            }
            
            console.log("提示框已设置为可见状态");
        } else {
            console.error("找不到 customAlert 元素!");
            return;
        }
        
        // 移除之前的事件监听器（如果有）
        const newAlertConfirm = elements.alertConfirm.cloneNode(true);
        elements.alertConfirm.parentNode.replaceChild(newAlertConfirm, elements.alertConfirm);
        elements.alertConfirm = newAlertConfirm;
        
        // 添加新的点击事件
        elements.alertConfirm.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("确定按钮被点击");
            
            // 无论当前状态如何，都立即停止所有声音
            utils.stopSound();
            console.log("用户点击确定按钮后立即停止提示音");
            
            // 隐藏提示框
            elements.customAlert.classList.add('hidden');
            elements.customAlert.style.display = "none";
            
            // 确保回调函数被执行
            if (callback) {
                console.log("执行回调函数");
                setTimeout(() => {
                    callback();
                }, 100);
            }
        });
        
        // 确保确认按钮可以点击
        console.log("确认按钮已设置事件监听器");
    },
    
    // 显示通知
    showNotification: (message, options = {}, callback = null) => {
        // 只在显式调用时显示自定义提示框，而不是在初始化时
        if (message) {
            utils.showCustomAlert(message, callback);
        }
        
        // 同时尝试系统通知
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                const notificationTitle = translations[state.currentLanguage].notificationTitle;
                const notification = new Notification(notificationTitle, {
                    body: message,
                    icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23ff7a59"><path d="M11,2V22C5.9,21.5,2,17.2,2,12S5.9,2.5,11,2z M13,2V22c5.1-0.5,9-4.8,9-10S18.1,2.5,13,2z"/></svg>',
                    ...options
                });
                
                state.notificationInstance = notification;
                
                // 当点击系统通知时也执行回调并停止声音
                if (callback) {
                    notification.onclick = () => {
                        // 立即停止提示音
                        utils.stopSound();
                        console.log("用户点击系统通知后立即停止提示音");
                        
                        callback();
                        notification.close();
                    };
                }
                
                return notification;
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted' && message) {
                        // 只在有消息且权限通过时才显示通知，避免在初始化时显示
                        if ('Notification' in window) {
                            const notificationTitle = translations[state.currentLanguage].notificationTitle;
                            const notification = new Notification(notificationTitle, {
                                body: message,
                                icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23ff7a59"><path d="M11,2V22C5.9,21.5,2,17.2,2,12S5.9,2.5,11,2z M13,2V22c5.1-0.5,9-4.8,9-10S18.1,2.5,13,2z"/></svg>',
                                ...options
                            });
                            
                            // 当点击系统通知时也执行回调并停止声音
                            notification.onclick = () => {
                                // 立即停止提示音
                                utils.stopSound();
                                console.log("用户点击系统通知后立即停止提示音");
                                
                                callback();
                                notification.close();
                            };
                        }
                    }
                });
            }
        }
    },
    
    // 播放提示音
    playNotificationSound: () => {
        // 首先创建一个新的音频上下文
        try {
            console.log("开始播放提示音，将持续60秒");
            
            // 先停止任何现有的声音
            utils.stopSound();
            
            // 清除任何现有的定时器
            if (state.soundTimer) {
                clearInterval(state.soundTimer);
                state.soundTimer = null;
            }
            
            // 如果已经有音频文件存在，设置循环播放
            if (elements.notificationSound.src && elements.notificationSound.src !== window.location.href) {
                console.log("播放已存在的音频文件");
                elements.notificationSound.currentTime = 0;
                elements.notificationSound.loop = true; // 设置为循环播放
                elements.notificationSound.play()
                    .then(() => console.log("循环播放成功"))
                    .catch(error => {
                        console.error('无法播放外部音频文件:', error);
                        // 如果外部文件播放失败，尝试创建内置音频
                        createInlineAudio();
                    });
            } else {
                console.log("创建并播放内置音频");
                createInlineAudio();
            }
            
            // 60秒后自动停止
            setTimeout(() => {
                utils.stopSound();
            }, 60000);
        } catch (error) {
            console.error('播放声音出错:', error);
            alert("无法播放声音提醒。请确保您的浏览器支持音频播放且未静音。");
        }
        
        // 创建内置音频函数 - 实现连续播放
        function createInlineAudio() {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) {
                    throw new Error("您的浏览器不支持 Web Audio API");
                }
                
                // 创建并保存音频上下文的引用
                const audioContext = new AudioContext();
                state.audioContext = audioContext;
                state.audioNodes = [];
                
                // 创建持续播放的定时器
                let beepCount = 0;
                state.soundTimer = setInterval(() => {
                    // 每次创建新的音频源并播放
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    // 保存节点引用以便后续停止
                    state.audioNodes.push(oscillator);
                    state.audioNodes.push(gainNode);
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5音符
                    
                    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.1);
                    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.8);
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 1);
                    
                    beepCount++;
                    
                    // 如果已经播放了60秒（约60次），停止定时器
                    if (beepCount >= 60) {
                        utils.stopSound(); // 使用改进的停止函数
                    }
                }, 1000); // 每秒播放一次蜂鸣声
                
                console.log("创建内置音频成功，将持续播放60秒");
            } catch (error) {
                console.error('创建内置音频失败:', error);
                // 如果Web Audio API不可用，尝试使用系统提示音
                try {
                    // 初始化临时音频实例数组（如果不存在）
                    if (!state.tempAudioInstances) {
                        state.tempAudioInstances = [];
                    }
                    
                    // 创建一个循环播放的基本音频
                    const createRepeatingBeep = () => {
                        const beep = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"+Array(1000).join("A"));
                        // 保存音频实例的引用以便后续停止
                        state.tempAudioInstances.push(beep);
                        
                        beep.play().catch(error => console.error('播放beep音频失败:', error));
                        
                        // 每秒重复播放
                        if (!state.soundTimer) {
                            let beepCount = 0;
                            state.soundTimer = setInterval(() => {
                                createRepeatingBeep();
                                beepCount++;
                                if (beepCount >= 60) {
                                    utils.stopSound(); // 使用改进的停止函数
                                }
                            }, 1000);
                        }
                    };
                    
                    createRepeatingBeep();
                } catch (error) {
                    console.error('无法创建任何音频:', error);
                }
            }
        }
    },
    
    // 停止声音
    stopSound: () => {
        console.log("执行停止声音操作");
        
        // 停止标准音频元素
        if (elements.notificationSound) {
            elements.notificationSound.pause();
            elements.notificationSound.loop = false;
            elements.notificationSound.currentTime = 0;
            console.log("停止标准音频元素");
        }
        
        // 清除定时器
        if (state.soundTimer) {
            clearInterval(state.soundTimer);
            state.soundTimer = null;
            console.log("清除声音定时器");
        }
        
        // 关闭所有临时创建的音频实例
        if (state.tempAudioInstances && state.tempAudioInstances.length > 0) {
            state.tempAudioInstances.forEach(audio => {
                try {
                    audio.pause();
                    audio.currentTime = 0;
                } catch (e) {
                    console.warn("停止临时音频实例失败:", e);
                }
            });
            state.tempAudioInstances = [];
            console.log("停止所有临时音频实例");
        }
        
        // 尝试关闭音频上下文
        if (state.audioContext) {
            try {
                if (state.audioContext.state !== 'closed') {
                    // 现代浏览器支持关闭上下文
                    if (typeof state.audioContext.close === 'function') {
                        state.audioContext.close()
                            .then(() => console.log("音频上下文已关闭"))
                            .catch(e => console.warn("关闭音频上下文失败:", e));
                    }
                    // 停止所有当前连接的节点
                    if (state.audioNodes && state.audioNodes.length > 0) {
                        state.audioNodes.forEach(node => {
                            try {
                                if (node.stop && typeof node.stop === 'function') {
                                    node.stop();
                                }
                                if (node.disconnect && typeof node.disconnect === 'function') {
                                    node.disconnect();
                                }
                            } catch (e) {
                                console.warn("断开音频节点失败:", e);
                            }
                        });
                        state.audioNodes = [];
                        console.log("断开所有音频节点");
                    }
                }
            } catch (e) {
                console.warn("关闭音频上下文失败:", e);
            }
            // 无论成功与否，都移除对上下文的引用
            state.audioContext = null;
        }
        
        console.log("所有声音操作已停止");
    }
};

// 计时器控制函数
const timerFunctions = {
    startWorkTimer: () => {
        state.isWorking = true;
        state.isBreaking = false;
        state.workDuration = parseInt(document.getElementById('work-time').value);
        state.remainingTime = state.workDuration;
        
        elements.timeDisplay.textContent = utils.formatTime(state.remainingTime);
        elements.floatingTime.textContent = utils.formatTime(state.remainingTime);
        
        // 更新UI状态
        elements.timerTitle.textContent = translations[state.currentLanguage].workingState;
        elements.floatingTitle.textContent = translations[state.currentLanguage].floatingWorkTitle;
        elements.startWorkBtn.disabled = true;
        elements.stopWorkBtn.disabled = false;
        elements.startBreakBtn.disabled = true;
        elements.stopBreakBtn.disabled = true;
        
        // 显示浮窗
        elements.floatingWindow.classList.remove('hidden');
        
        timerFunctions.startTimer();
    },
    
    stopWorkTimer: () => {
        timerFunctions.stopTimer();
        state.isWorking = false;
        
        elements.timerTitle.textContent = translations[state.currentLanguage].timerPrep;
        elements.startWorkBtn.disabled = false;
        elements.stopWorkBtn.disabled = true;
        elements.startBreakBtn.disabled = false;
        elements.stopBreakBtn.disabled = true;
        
        // 隐藏浮窗
        elements.floatingWindow.classList.add('hidden');
    },
    
    startBreakTimer: () => {
        state.isBreaking = true;
        state.isWorking = false;
        state.breakDuration = parseInt(document.getElementById('break-time').value);
        state.remainingTime = state.breakDuration;
        
        elements.timeDisplay.textContent = utils.formatTime(state.remainingTime);
        elements.floatingTime.textContent = utils.formatTime(state.remainingTime);
        
        // 更新UI状态 - 明确显示"休息中"
        elements.timerTitle.textContent = translations[state.currentLanguage].breakingState;
        elements.floatingTitle.textContent = translations[state.currentLanguage].floatingBreakTitle;
        elements.startWorkBtn.disabled = true;
        elements.stopWorkBtn.disabled = true;
        elements.startBreakBtn.disabled = true;
        elements.stopBreakBtn.disabled = false;
        
        // 显示浮窗
        elements.floatingWindow.classList.remove('hidden');
        
        timerFunctions.startTimer();
    },
    
    stopBreakTimer: () => {
        timerFunctions.stopTimer();
        state.isBreaking = false;
        
        elements.timerTitle.textContent = translations[state.currentLanguage].timerPrep;
        elements.startWorkBtn.disabled = false;
        elements.stopWorkBtn.disabled = true;
        elements.startBreakBtn.disabled = false;
        elements.stopBreakBtn.disabled = true;
        
        // 隐藏浮窗
        elements.floatingWindow.classList.add('hidden');
    },
    
    startTimer: () => {
        // 清除任何现有的计时器
        if (state.timer) {
            clearInterval(state.timer);
        }
        
        let startTime = Date.now();
        const initialDuration = state.remainingTime;
        
        state.timer = setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
            state.remainingTime = initialDuration - elapsedSeconds;
            
            if (state.remainingTime <= 0) {
                console.log("计时器结束，触发完成事件");
                timerFunctions.handleTimerComplete();
            } else {
                const formattedTime = utils.formatTime(state.remainingTime);
                elements.timeDisplay.textContent = formattedTime;
                elements.floatingTime.textContent = formattedTime;
            }
        }, 1000);
    },
    
    stopTimer: () => {
        if (state.timer) {
            clearInterval(state.timer);
            state.timer = null;
        }
        utils.stopSound();
    },
    
    handleTimerComplete: () => {
        timerFunctions.stopTimer();
        
        if (state.isWorking) {
            state.isWorking = false;
            state.sessionsCompleted++;
            elements.sessionsCount.textContent = state.sessionsCompleted;
            
            const message = translations[state.currentLanguage].workComplete;
            
            // 确保声音播放和通知显示 - 工作结束时播放提示音
            utils.playNotificationSound();
            console.log("工作时间结束，播放提示音");
            
            // 添加回调函数，在确认对话框关闭后自动开始休息
            const startBreakCallback = () => {
                console.log("工作时间结束确认后，自动开始休息");
                timerFunctions.startBreakTimer();
            };
            
            // 强制显示自定义提示框 - 确保提示框可见
            console.log("正在显示工作结束提示框...");
            
            // 先确保提示框内容正确设置
            if (elements.alertMessage) {
                elements.alertMessage.textContent = message;
            }
            
            // 确保提示框可见
            if (elements.customAlert) {
                elements.customAlert.style.display = "flex";
                elements.customAlert.classList.remove('hidden');
            }
            
            // 使用 showCustomAlert 方法显示提示框和设置回调
            utils.showCustomAlert(message, startBreakCallback);
            
            // 同时尝试系统通知
            if (Notification.permission === 'granted') {
                const notification = new Notification(translations[state.currentLanguage].notificationTitle, {
                    body: message,
                    requireInteraction: true
                });
                
                // 当点击系统通知时也执行回调并停止声音
                notification.onclick = () => {
                    // 立即停止提示音
                    utils.stopSound();
                    console.log("用户点击系统通知后立即停止提示音");
                    
                    startBreakCallback();
                    notification.close();
                };
            }
            
            // 重置UI，但保持开始休息按钮可用
            elements.startWorkBtn.disabled = false;
            elements.stopWorkBtn.disabled = true;
            elements.startBreakBtn.disabled = false;  // 保持可用状态，方便手动点击
            elements.stopBreakBtn.disabled = true;
            elements.timerTitle.textContent = translations[state.currentLanguage].timerPrep;
            
        } else if (state.isBreaking) {
            state.isBreaking = false;
            state.breaksCompleted++;
            elements.breaksCount.textContent = state.breaksCompleted;
            
            const message = translations[state.currentLanguage].breakComplete;
            
            // 休息结束时不播放提示音 - 只显示通知
            console.log("休息时间结束，不播放提示音，只显示提示框");
            
            // 添加回调函数，在确认对话框关闭后重置计时器
            const resetTimerCallback = () => {
                console.log("休息时间结束确认后，重置计时器");
                // 重置状态但不自动开始工作
                elements.startWorkBtn.disabled = false;
                elements.stopWorkBtn.disabled = true;
                elements.startBreakBtn.disabled = false;
                elements.stopBreakBtn.disabled = true;
                elements.timerTitle.textContent = translations[state.currentLanguage].timerPrep;
            };
            
            // 使用utils.showCustomAlert而不是timerFunctions.showCustomAlert
            utils.showCustomAlert(message, resetTimerCallback);
            
            // 同时尝试系统通知
            if (Notification.permission === 'granted') {
                const notification = new Notification(translations[state.currentLanguage].notificationTitle, {
                    body: message,
                    requireInteraction: true
                });
                
                // 当点击系统通知时执行回调（休息结束无音效，无需停止）
                notification.onclick = () => {
                    resetTimerCallback();
                    notification.close();
                };
            }
            
            // 更新成就点
            utils.updateAchievementDots();
        }
        
        elements.timeDisplay.textContent = "00:00";
        elements.floatingWindow.classList.add('hidden');
    }
};

// 事件监听器
function addEventListeners() {
    // 语言切换
    elements.languageSelect.addEventListener('change', () => {
        state.currentLanguage = elements.languageSelect.value;
        utils.updateTexts();
    });
    
    // 工作按钮
    elements.startWorkBtn.addEventListener('click', timerFunctions.startWorkTimer);
    elements.stopWorkBtn.addEventListener('click', timerFunctions.stopWorkTimer);
    
    // 休息按钮
    elements.startBreakBtn.addEventListener('click', timerFunctions.startBreakTimer);
    elements.stopBreakBtn.addEventListener('click', timerFunctions.stopBreakTimer);
    
    // 最小化浮窗
    document.getElementById('minimize-float').addEventListener('click', () => {
        elements.floatingWindow.classList.add('hidden');
    });
    
    // 测试声音按钮
    document.getElementById('test-sound').addEventListener('click', () => {
        console.log("测试声音按钮被点击");
        // 模拟工作状态结束时的行为
        state.isWorking = true;
        state.isBreaking = false;
        utils.playNotificationSound();
    });
    
    // 紧急停止声音按钮
    document.getElementById('stop-sound').addEventListener('click', () => {
        console.log("紧急停止声音按钮被点击");
        utils.stopSound();
        alert(translations[state.currentLanguage].emergencyStopMessage);
    });
    
    // 添加键盘事件监听 - 按下Escape键可以停止声音
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            utils.stopSound();
            console.log("用户按下Escape键停止提示音");
        }
    });
    
    // 通知权限请求 - 静默获取权限，不显示任何提示框
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        // 只请求权限，不显示任何提示
        Notification.requestPermission().then(permission => {
            console.log("通知权限状态:", permission);
        });
    }
}

// 修改自定义弹窗样式，使它与图片中更接近
function updateAlertStyles() {
    if (!elements.customAlert) return;
    
    // 确保一开始是隐藏的
    elements.customAlert.classList.add('hidden');
}

// 创建默认音频文件，生成一分钟长的音频
function createDefaultAudio() {
    // 创建一个简单的提示音（如果没有提供外部音频文件）
    if (!elements.notificationSound.src || elements.notificationSound.src === window.location.href || elements.notificationSound.error) {
        try {
            console.log("生成内置提示音...");
            
            // 使用Web Audio API创建音频上下文
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // 创建用于播放的AudioBuffer
            const sampleRate = 44100; // 标准采样率
            const duration = 3; // 音频片段长度（秒）
            const channels = 1; // 单声道
            const frameCount = sampleRate * duration;
            
            // 创建一个音频缓冲区
            const myArrayBuffer = audioContext.createBuffer(channels, frameCount, sampleRate);
            
            // 填充缓冲区数据 - 创建一个简单的警报声音
            for (let channel = 0; channel < channels; channel++) {
                // 获取数据
                const nowBuffering = myArrayBuffer.getChannelData(channel);
                for (let i = 0; i < frameCount; i++) {
                    // 嘀嘀声模式：交替高低音调
                    const highFreq = 880; // 880Hz - A5音符
                    const lowFreq = 440;  // 440Hz - A4音符
                    
                    // 计算当前时间（秒）
                    const time = i / sampleRate;
                    
                    // 在不同的时间区间产生不同的音调
                    let freq = (Math.floor(time * 2) % 2 === 0) ? highFreq : lowFreq;
                    
                    // 使用正弦波生成声音
                    nowBuffering[i] = Math.sin(2 * Math.PI * freq * time) * 0.5;
                    
                    // 添加音量包络线，使声音更自然
                    const envelope = Math.sin(Math.PI * (i % (sampleRate / 2)) / (sampleRate / 2));
                    nowBuffering[i] *= envelope * 0.5;
                }
            }
            
            // 将AudioBuffer转换为WAV格式
            const blob = bufferToWave(myArrayBuffer, 0, frameCount);
            const blobUrl = URL.createObjectURL(blob);
            
            // 更新音频元素
            elements.notificationSound.src = blobUrl;
            elements.notificationSound.loop = true; // 循环播放
            
            console.log("内置提示音生成成功");
        } catch (error) {
            console.error('生成内置音频失败:', error);
        }
    }
    
    // AudioBuffer 转 WAV Blob函数
    function bufferToWave(abuffer, offset, len) {
        const numOfChan = abuffer.numberOfChannels;
        const length = len * numOfChan * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);
        const channels = [];
        let i, sample;
        
        // 写入WAV文件头
        writeString(view, 0, 'RIFF');
        view.setUint32(4, length - 8, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numOfChan, true);
        view.setUint32(24, abuffer.sampleRate, true);
        view.setUint32(28, abuffer.sampleRate * 2 * numOfChan, true);
        view.setUint16(32, numOfChan * 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, length - 44, true);
        
        // 写入PCM样本
        for (i = 0; i < abuffer.numberOfChannels; i++) {
            channels.push(abuffer.getChannelData(i));
        }
        
        offset = offset || 0;
        for (i = 0; i < len; i++) {
            for (let ch = 0; ch < numOfChan; ch++) {
                sample = Math.max(-1, Math.min(1, channels[ch][i]));
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
                view.setInt16(44 + (i * numOfChan + ch) * 2, sample, true);
            }
        }
        
        return new Blob([buffer], { type: 'audio/wav' });
    }
    
    // 写入字符串到DataView
    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }
}

// 初始化应用
function init() {
    // 确保提示框在初始状态下是隐藏的
    if (elements.customAlert) {
        elements.customAlert.classList.add('hidden');
        elements.customAlert.style.display = "none";
    }
    
    utils.updateTexts();
    updateAlertStyles(); // 调用更新提示框样式函数
    createDefaultAudio();
    addEventListeners();
    
    // 添加测试按钮事件监听
    const testButton = document.getElementById('test-sound');
    if (testButton) {
        testButton.addEventListener('dblclick', () => {
            console.log("双击测试按钮 - 测试提示框");
            const message = translations[state.currentLanguage].workComplete;
            // 模拟工作状态结束时的行为
            state.isWorking = true;
            state.isBreaking = false;
            
            // 播放提示音（模拟工作结束）
            utils.playNotificationSound();
            
            const testCallback = () => {
                console.log("测试回调函数已执行");
                // 重置状态
                state.isWorking = false;
                state.isBreaking = false;
            };
            utils.showCustomAlert(message, testCallback);
        });
    }
    
    // 默认选中25分钟工作，5分钟休息
    document.getElementById('work-time').value = '1500';
    document.getElementById('break-time').value = '300';
    
    // 测试音频系统
    console.log("初始化音频系统...");
    
    // 确保浏览器支持Web Audio API
    if (window.AudioContext || window.webkitAudioContext) {
        console.log("浏览器支持Web Audio API");
    } else {
        console.warn("浏览器不支持Web Audio API，可能无法播放声音提醒");
    }
    
    // 检查通知权限
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            console.log("已获得通知权限");
        } else if (Notification.permission !== 'denied') {
            console.log("请求通知权限");
            Notification.requestPermission().then(permission => {
                console.log("通知权限状态:", permission);
                // 不在这里显示任何提示或通知
            });
        } else {
            console.warn("通知权限被拒绝");
        }
    } else {
        console.warn("浏览器不支持通知API");
    }
}

// 在DOM内容加载后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM内容加载完成，初始化应用");
    
    // 确保提示框一开始是隐藏的，但不阻止后续显示
    const alertElement = document.getElementById('custom-alert');
    if (alertElement) {
        console.log("初始化时隐藏提示框");
        alertElement.classList.add('hidden');
        alertElement.style.display = "none";
        
        // 清空提示框内容，避免在初始化时显示不必要的消息
        const alertMessage = document.getElementById('alert-message');
        if (alertMessage) {
            alertMessage.textContent = "";
        }
    }
    
    // 设置按钮文本（确保即使在HTML中有默认文本也会被正确的语言文本替换）
    const testSoundBtn = document.getElementById('test-sound');
    const stopSoundBtn = document.getElementById('stop-sound');
    if (testSoundBtn && stopSoundBtn) {
        const lang = translations[state.currentLanguage];
        testSoundBtn.textContent = lang.testSound;
        stopSoundBtn.textContent = lang.emergencyStopSound;
    }
    
    // 初始化音频设置
    if (elements.notificationSound) {
        // 确保加载完成后不自动播放
        elements.notificationSound.autoplay = false;
        // 预加载音频
        elements.notificationSound.load();
        // 设置音频可以循环播放
        elements.notificationSound.loop = false;
        
        // 音频加载完成事件
        elements.notificationSound.addEventListener('canplaythrough', () => {
            console.log("音频文件加载完成，可以播放");
        });
        
        // 音频播放错误事件
        elements.notificationSound.addEventListener('error', (e) => {
            console.error("音频文件加载失败:", e);
        });
    }
    
    // 然后初始化应用
    init();
}); 