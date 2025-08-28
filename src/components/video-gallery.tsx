
"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, Fullscreen, PictureInPicture } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';


const videos = [
    { src: "/videos/Wedding teaser thumbnail.mp4" ,poster: "/images/aagam-aangi-testimonials-1.jpg"},
    { src: "/videos/Save the date - Sparsh & Vama.mp4", poster: "/images/parth-nikki-thumbnail.jpg" },
    { src: "/videos/WEDDING HIGHLIGHT- Parth & Nishita wn.mp4", poster: "/images/divya-karina-5.jpg" },
    { src: "https://ik.imagekit.io/dqel2bwws/Parth%20&%20Niki's%20teaser.mp4?updatedAt=1753167450727", poster: "/images/aagam-aangi-testimonials-2.jpg" },
];

function ChevronsRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
    )
}

function ChevronsLeft(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
    )
}


export function VideoGallery() {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [progress, setProgress] = useState<{ [key: number]: number }>({});
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(true);
    const [durations, setDurations] = useState<{ [key: number]: number }>({});
    const [lastTap, setLastTap] = useState<{ [key: number]: number | null }>({});
    const [seekDirection, setSeekDirection] = useState<{ [key: number]: 'forward' | 'backward' | null }>({});
    const singleTapTimeout = useRef<NodeJS.Timeout | null>(null);
    const seekTimeout = useRef<{ [key: number]: NodeJS.Timeout }>({});


    useEffect(() => {
        const handleTimeUpdate = (index: number) => {
            const video = videoRefs.current[index];
            if (video) {
                setProgress(prev => ({ ...prev, [index]: (video.currentTime / video.duration) * 100 }));
            }
        };

        const handleLoadedMetadata = (index: number) => {
            const video = videoRefs.current[index];
            if (video) {
                setDurations(prev => ({ ...prev, [index]: video.duration }));
            }
        };
        
        const handleVideoEnd = (index: number) => {
            setPlayingIndex(null);
            const video = videoRefs.current[index];
            if(video) {
                video.currentTime = 0;
                setProgress(prev => ({ ...prev, [index]: 0 }));
            }
        }

        videoRefs.current.forEach((video, index) => {
            if (video) {
                const timeUpdateListener = () => handleTimeUpdate(index);
                const loadedMetadataListener = () => handleLoadedMetadata(index);
                const endedListener = () => handleVideoEnd(index);

                video.addEventListener('timeupdate', timeUpdateListener);
                video.addEventListener('loadedmetadata', loadedMetadataListener);
                video.addEventListener('ended', endedListener);
                
                return () => {
                    if (video) {
                        video.removeEventListener('timeupdate', timeUpdateListener);
                        video.removeEventListener('loadedmetadata', loadedMetadataListener);
                        video.removeEventListener('ended', endedListener);
                    }
                };
            }
        });
    }, []);


    const togglePlay = (index: number) => {
        if (playingIndex === index) {
            videoRefs.current[index]?.pause();
            setPlayingIndex(null);
        } else {
            videoRefs.current.forEach((video, i) => {
                if(video && i !== index) {
                    video.pause();
                }
            });

            const video = videoRefs.current[index]
            if (video) {
                video.play();
                video.muted = isMuted;
                video.volume = isMuted ? 0 : volume;
                setPlayingIndex(index);
            }
        }
    };
    
    const showSeekIndicator = (index: number, direction: 'forward' | 'backward') => {
        if (seekTimeout.current[index]) {
            clearTimeout(seekTimeout.current[index]);
        }
        setSeekDirection(prev => ({...prev, [index]: direction}));
        seekTimeout.current[index] = setTimeout(() => {
            setSeekDirection(prev => ({...prev, [index]: null}));
        }, 500);
    }

    const handleVideoClick = (index: number, event: React.MouseEvent) => {
        if(singleTapTimeout.current) {
            clearTimeout(singleTapTimeout.current);
            singleTapTimeout.current = null;
        }
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (lastTap[index] && now - lastTap[index]! < DOUBLE_TAP_DELAY) {
            // Double tap
            const video = videoRefs.current[index];
            if (video) {
                const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                if (clickX > rect.width / 2) {
                    video.currentTime = Math.min(video.duration, video.currentTime + 5);
                    showSeekIndicator(index, 'forward');
                } else {
                    video.currentTime = Math.max(0, video.currentTime - 5);
                    showSeekIndicator(index, 'backward');
                }
            }
            setLastTap(prev => ({ ...prev, [index]: null }));
        } else {
            // Single tap
            setLastTap(prev => ({ ...prev, [index]: now }));
            singleTapTimeout.current = setTimeout(() => {
                togglePlay(index);
                setLastTap(prev => ({ ...prev, [index]: null }));
            }, DOUBLE_TAP_DELAY);
        }
    };

    const handleProgressChange = (value: number[], index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            const newTime = (value[0] / 100) * video.duration;
            video.currentTime = newTime;
            setProgress(prev => ({ ...prev, [index]: value[0] }));
        }
    };

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0];
        setVolume(newVolume);
        const newMutedState = newVolume === 0;
        setIsMuted(newMutedState);

        videoRefs.current.forEach(video => {
            if (video) {
                video.volume = newVolume;
                video.muted = newMutedState;
            }
        });
    };
    
    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        
        videoRefs.current.forEach(video => {
            if (video) {
                video.muted = newMutedState;
                if (!newMutedState && volume === 0) {
                    setVolume(0.5);
                    video.volume = 0.5;
                } else {
                    video.volume = newMutedState ? 0 : volume;
                }
            }
        });
    };


    const formatTime = (time: number) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const VolumeIcon = () => {
        if (isMuted || volume === 0) return <VolumeX className="h-5 w-5 text-white" />;
        if (volume < 0.5) return <Volume1 className="h-5 w-5 text-white" />;
        return <Volume2 className="h-5 w-5 text-white" />;
    };

    const toggleFullscreen = async (index: number) => {
        const elem = containerRefs.current[index];
        if (!elem) return;

        try {
            if (!document.fullscreenElement) {
                await elem.requestFullscreen();
                if (screen.orientation && typeof screen.orientation.lock === 'function') {
                    await screen.orientation.lock('landscape').catch(() => {});
                }
            } else {
                if (document.exitFullscreen) {
                    if (screen.orientation && typeof screen.orientation.unlock === 'function') {
                        screen.orientation.unlock();
                    }
                    await document.exitFullscreen();
                }
            }
        } catch (err) {
            console.error("Fullscreen or orientation lock failed:", err);
        }
    }
    
    const handlePictureInPicture = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            } else {
                video.requestPictureInPicture();
            }
        }
    }


    return (
        <section id="video-gallery" className="w-full py-12 md:py-24 lg:py-32" style={{ backgroundColor: '#F2EFEA' }}>
            <div className=" px-5 md:px-20">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl md:text-6xl lg:text-7xl font-headline font-light tracking-tight"><span >Forever</span> in Frame</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                    {videos.map((video, index) => (
                        <div 
                            key={index} 
                            ref={el => containerRefs.current[index] = el}
                            className="relative aspect-video overflow-hidden group/video bg-black"
                        >
                            <video
                                ref={el => videoRefs.current[index] = el}
                                src={video.src}
                                poster={video.poster}
                                loop={false}
                                playsInline
                                onClick={(e) => handleVideoClick(index, e)}
                                onPause={() => {
                                    if (playingIndex === index) {
                                        setPlayingIndex(null);
                                    }
                                }}
                                className="w-full h-full object-cover cursor-pointer"
                            />
                            
                            <div className={cn(
                                "absolute inset-0 flex items-center justify-center transition-opacity bg-black/20",
                                playingIndex === index ? "opacity-0 group-hover/video:opacity-100" : "opacity-100"
                            )}
                            onClick={(e) => handleVideoClick(index, e)}
                            >
                                {playingIndex !== index && (
                                    <div className="rounded-full p-4 transition-transform group-hover/video:scale-110 backdrop-blur-sm bg-[#C2A77C]">
                                        <Play className="h-8 w-8 text-white fill-white" />
                                    </div>
                                )}
                            </div>

                             <div className={cn("absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300",
                                seekDirection[index] ? 'opacity-100' : 'opacity-0'
                            )}>
                                <div className="bg-black/50 rounded-full p-3 flex items-center justify-center">
                                {seekDirection[index] === 'forward' && <ChevronsRight className="h-8 w-8 text-white" />}
                                {seekDirection[index] === 'backward' && <ChevronsLeft className="h-8 w-8 text-white" />}
                                </div>
                            </div>
                            
                            <div className={cn(
                                "absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 opacity-0 group-hover/video:opacity-100",
                                playingIndex === index && 'opacity-100'
                            )}>
                               <div className="flex items-center gap-3">
                                   <Slider
                                    value={[progress[index] || 0]}
                                    onValueChange={(value) => handleProgressChange(value, index)}
                                    max={100}
                                    step={0.1}
                                    className="w-full h-5 [&>span:first-child]:h-1.5"
                                   />
                               </div>

                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center gap-2">
                                        <button onClick={(e) => { e.stopPropagation(); togglePlay(index); }} className='p-1'>
                                            {playingIndex === index ? <Pause className="h-5 w-5 text-white fill-white"/> : <Play className="h-5 w-5 text-white fill-white" />}
                                        </button>
                                       
                                        <div className="relative group/volume">
                                            <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="p-1">
                                                <VolumeIcon />
                                            </button>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 hidden group-hover/volume:block ">
                                                 <Slider
                                                    defaultValue={[isMuted ? 0 : volume]}
                                                    value={[isMuted ? 0 : volume]}
                                                    onValueChange={handleVolumeChange}
                                                    max={1}
                                                    step={0.05}
                                                    className="h-24 w-5"
                                                    orientation="vertical"
                                                />
                                            </div>
                                        </div>

                                         <span className="text-sm font-body">
                                            {formatTime(videoRefs.current[index]?.currentTime || 0)}
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                         <button onClick={(e) => {e.stopPropagation(); handlePictureInPicture(index)}} className='p-1'>
                                            <PictureInPicture className="h-5 w-5 text-white" />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(index);}} className='p-1'>
                                            <Fullscreen className="h-5 w-5 text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
