import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { id: 1, title: 'Летний Дождь', duration: '3:42', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Звездная Ночь', duration: '4:15', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, title: 'Городские Огни', duration: '3:28', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 4, title: 'Мечты', duration: '5:02', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  ];

  const galleryImages = [
    'https://cdn.poehali.dev/files/23923c5f-cc09-49ce-89aa-e9760b90f0b2.jpg',
    'https://cdn.poehali.dev/files/f6d3692d-37b0-4e47-b823-f61e9e0b0997.jpg',
    'https://cdn.poehali.dev/files/dfa1ed90-227c-47fe-9f47-56b8559664ad.png',
    'https://cdn.poehali.dev/files/850a0b27-6d8f-4224-a90e-accef2bd2abf.jpg',
    'https://cdn.poehali.dev/files/4ae57901-bfcd-41b8-ba09-6372c9043522.png',
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (currentTrack < tracks.length - 1) {
        playTrack(currentTrack + 1);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gradient">Артист</h1>
            
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('hero')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('bio')} className="hover:text-primary transition-colors">Биография</button>
              <button onClick={() => scrollToSection('music')} className="hover:text-primary transition-colors">Музыка</button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-primary transition-colors">Галерея</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Контакты</button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-6 mt-8">
                  <button onClick={() => { scrollToSection('hero'); setMobileMenuOpen(false); }} className="text-left hover:text-primary transition-colors text-lg">Главная</button>
                  <button onClick={() => { scrollToSection('bio'); setMobileMenuOpen(false); }} className="text-left hover:text-primary transition-colors text-lg">Биография</button>
                  <button onClick={() => { scrollToSection('music'); setMobileMenuOpen(false); }} className="text-left hover:text-primary transition-colors text-lg">Музыка</button>
                  <button onClick={() => { scrollToSection('gallery'); setMobileMenuOpen(false); }} className="text-left hover:text-primary transition-colors text-lg">Галерея</button>
                  <button onClick={() => { scrollToSection('contact'); setMobileMenuOpen(false); }} className="text-left hover:text-primary transition-colors text-lg">Контакты</button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4 sm:px-0">
        <div className="absolute inset-0 gradient-primary opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 text-gradient leading-tight">
                Музыка — это
                <br />моя душа
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                Создаю атмосферные композиции, которые трогают сердца и вдохновляют на мечты
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => scrollToSection('music')} size="lg" className="gradient-primary hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                  <Icon name="Play" className="mr-2" size={20} />
                  Слушать музыку
                </Button>
                <Button onClick={() => scrollToSection('contact')} size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                  Связаться
                </Button>
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute inset-0 gradient-accent opacity-20 blur-2xl rounded-3xl"></div>
                <img 
                  src="https://cdn.poehali.dev/files/850a0b27-6d8f-4224-a90e-accef2bd2abf.jpg"
                  alt="Артист"
                  className="relative rounded-3xl shadow-2xl w-full hover-lift animate-pulse-glow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="bio" className="py-12 sm:py-16 lg:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-12 text-center">
              <span className="text-gradient">Биография</span>
            </h2>
            <Card className="p-6 sm:p-8 lg:p-12 bg-card/50 backdrop-blur-sm border-border hover-lift">
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  Музыка всегда была частью моей жизни. С детства я чувствовал ритм в каждом звуке окружающего мира — 
                  от шума дождя до городского гула. Это вдохновило меня начать создавать собственные композиции.
                </p>
                <p>
                  За годы творчества я выпустил множество треков, каждый из которых рассказывает свою историю. 
                  Моя музыка — это сплав эмоций, воспоминаний и мечтаний, воплощенных в звуке.
                </p>
                <p>
                  Сегодня я продолжаю экспериментировать с жанрами, искать новые звучания и делиться своим творчеством 
                  с людьми по всему миру. Каждый концерт, каждая новая песня — это часть моего пути.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="Award" size={24} />
                  <span className="font-semibold">10+ лет на сцене</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <Icon name="Music" size={24} />
                  <span className="font-semibold">50+ композиций</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Icon name="Users" size={24} />
                  <span className="font-semibold">100+ концертов</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="music" className="py-12 sm:py-16 lg:py-24 relative bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-5xl font-black mb-12 text-center">
            <span className="text-gradient">Музыка</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card className="p-4 sm:p-6 lg:p-8 bg-card/80 backdrop-blur-sm border-border">
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 gradient-primary rounded-2xl flex items-center justify-center animate-pulse-glow">
                    <Icon name="Music" size={32} className="text-primary-foreground sm:w-10 sm:h-10" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">{tracks[currentTrack].title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{formatTime(duration)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-4 mb-4">
                  <Button 
                    size="lg" 
                    onClick={togglePlay}
                    className="gradient-primary hover:opacity-90 transition-opacity w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex-shrink-0"
                  >
                    <Icon name={isPlaying ? "Pause" : "Play"} size={20} className="sm:w-6 sm:h-6" />
                  </Button>
                  <div className="flex-1">
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground min-w-[80px] sm:min-w-[100px] text-right">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>

                <audio ref={audioRef} src={tracks[currentTrack].url} />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-lg mb-4">Плейлист</h4>
                {tracks.map((track, index) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(index)}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${
                      currentTrack === index ? 'bg-primary/10 border-l-4 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        currentTrack === index ? 'gradient-primary' : 'bg-muted'
                      }`}>
                        <Icon name={currentTrack === index && isPlaying ? "Pause" : "Play"} size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">{track.title}</p>
                      </div>
                    </div>
                    <span className="text-muted-foreground">{track.duration}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 gradient-accent hover:opacity-90 transition-opacity text-sm sm:text-base">
                  <Icon name="Download" className="mr-2" size={20} />
                  Скачать альбом
                </Button>
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 text-sm sm:text-base">
                  <Icon name="Share2" className="mr-2" size={20} />
                  Поделиться
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-12 sm:py-16 lg:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-5xl font-black mb-12 text-center">
            <span className="text-gradient">Галерея</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="relative group overflow-hidden rounded-2xl hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={image} 
                  alt={`Галерея ${index + 1}`}
                  className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-semibold">Концерт {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-16 lg:py-24 relative bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-5xl font-black mb-12 text-center">
            <span className="text-gradient">Контакты</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 sm:p-8 lg:p-12 bg-card/80 backdrop-blur-sm border-border">
              <p className="text-center text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg">
                Свяжитесь со мной для сотрудничества, букинга или просто чтобы поделиться впечатлениями о музыке
              </p>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Имя</label>
                  <Input placeholder="Ваше имя" className="bg-background/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" className="bg-background/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Сообщение</label>
                  <Textarea placeholder="Ваше сообщение..." rows={5} className="bg-background/50" />
                </div>
                <Button className="w-full gradient-primary hover:opacity-90 transition-opacity text-base sm:text-lg py-4 sm:py-6">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить сообщение
                </Button>
              </form>
              
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                <div className="flex justify-center gap-4 sm:gap-6">
                  <Button size="lg" variant="ghost" className="hover:text-primary transition-colors">
                    <Icon name="Instagram" size={28} />
                  </Button>
                  <Button size="lg" variant="ghost" className="hover:text-primary transition-colors">
                    <Icon name="Youtube" size={28} />
                  </Button>
                  <Button size="lg" variant="ghost" className="hover:text-primary transition-colors">
                    <Icon name="Music" size={28} />
                  </Button>
                  <Button size="lg" variant="ghost" className="hover:text-primary transition-colors">
                    <Icon name="Mail" size={28} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 Артист. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;