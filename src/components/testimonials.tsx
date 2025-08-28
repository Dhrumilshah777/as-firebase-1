
"use client"

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
    {
        name: "Divy & Karina",
        quote: "The work done by Arihant Studio on my wedding is exceptional. All the people are very friendly and it seemed like they were more interested than us to get good photos 😊 The main thing I liked about you all is speed - we would get high quality reels and photos same day/ next day of the event which is truly appreciated ✨🙌",
        image: {
            src: "https://ik.imagekit.io/dqel2bwws/imgaes/Divy&karina_testimoinals-2.jpg?updatedAt=1753171717459",
            alt: "A couple walking on the beach",
            hint: "couple beach"
        }
    },
    {
        name: "Sparsh & Vama",
        quote: "“Hyy Tirth Just wanted to thank you for the efforts u had taken!Really loved the outcomeIt was our first time and u made us feel so comfortable in front of the camera Had a great time filming itAnd everyone has appreciated your work as well they all loved it Thank you so much once again💓”",
        image: {
            src: "https://ik.imagekit.io/dqel2bwws/imgaes/sparsh%20and%20vama%20testimonial.jpeg?updatedAt=1756104809278",
            alt: "A smiling couple",
            hint: "happy couple"
        }
    },
    {
        name: "Aagam & Aangi",
        quote: "“Thank you so much for making our day so special! 🤍 We loved everything, and the attention to detail was simply amazing. 🔵 We’re beyond happy with your work, and I’m at a loss for words—it was surreal to witness everything. ❤️ Once again, thank you so much! 🥹”",
        image: {
            src: "https://ik.imagekit.io/dqel2bwws/imgaes/aagam-aangi-testimonials-2.jpg?updatedAt=1756104869726",
            alt: "A couple in a cityscape",
            hint: "couple city"
        }
    },
    {
        name: "Rishil & Riya",
        quote: "“Hi Tirth,We just finished going through all the pictures and videos, and I wanted to take a moment to truly appreciate the amazing work you and your team have done.The videos were edited so perfectly that I didn’t feel the need to ask for a single change. The photographs came out beautifully as well. What impressed me the most was your prompt delivery — you shared all the data within just 2 days of the event, which is truly commendable.Thank you for making my event even more special by capturing such lovely moments and presenting them so professionally. Keep up the fantastic work! I’ll definitely be recommending your services to anyone in need of photography or videography for their events.”",
        image: {
            src: "https://ik.imagekit.io/dqel2bwws/Rishil&Riya.jpg?updatedAt=1754049457140",
            alt: "to be parents couple",
            hint: "parents couple"
        }
    }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32" style={{ backgroundColor: '#fffffc' }}>
        <div className="">
             <Carousel 
                className="w-full "
                plugins={[
                    Autoplay({
                      delay: 5000,
                      stopOnInteraction: true,
                    }),
                ]}
                opts={{
                    loop: true,
                    align: "start"
                }}
            >
                <CarouselContent className="-ml-1">
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="pl-1">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                                <div className="lg:order-1 px-4 my-auto">
                                     <div className="space-y-6 text-center">
                                         <p className="text-md tracking-widest uppercase text-muted-foreground">TESTIMONIALS</p>
                                         <h3 className="text-2xl md:text-3xl uppercase text-muted-foreground tracking-wider">{testimonial.name}</h3>
                                         <blockquote className="text-sm md:text-base text-muted-foreground px-5 leading-loose">
                                             “{testimonial.quote}”
                                         </blockquote>
                                     </div>
                                     <div className="flex lg:hidden justify-center gap-4 mt-8">
                                         <CarouselPrevious className="relative static translate-y-0 h-10 w-10" />
                                         <CarouselNext className="relative static translate-y-0 h-10 w-10" />
                                     </div>
                                </div>
                                <div className='order-first lg:order-2'>
                                     <Image
                                         src={testimonial.image.src}
                                         alt={testimonial.image.alt}
                                         data-ai-hint={testimonial.image.hint}
                                         width={800}
                                         height={600}
                                         className="object-cover w-full aspect-[4/3]"
                                         priority
                                     />
                                 </div>
                            </div>
                         </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden lg:flex justify-center gap-4 mt-8">
                    <CarouselPrevious className="relative static translate-y-0 h-10 w-10" />
                    <CarouselNext className="relative static translate-y-0 h-10 w-10" />
                </div>
            </Carousel>
        </div>
    </section>
  );
}
