
"use client";

import { useRef, useState } from "react";

type Song = {
  title: string;
  src: string;
};

type Question = {
  label: string;
  title: string;
  description: string;
  question: string;
  yesButton: string;
  noButton: string;
  yesMessage: string;
  noTitle: string;
  noMessage: string;
  song: Song;
};

const openingSong: Song = {
  title: "Chalo Jaane Do",
  src: "/music/chalo-jaane-do.mp3",
};

const dedicationSong: Song = {
  title: "Tera Yaar Hoon Main",
  src: "/music/tera-yaar-hoon-main.mp3",
};

const yesFriendshipSong: Song = {
  title: "Tu Hi To Meri Dost Hai",
  src: "/music/tu-hi-to-meri-dost-hai.mp3",
};

const yesSecondSong: Song = {
  title: "Kabhi Kabhi Aditi",
  src: "/music/kabhi-kabhi-aditi.mp3",
};

const wohDekhneMeinSong: Song = {
  title: "Woh Dekhne Mein",
  src: "/music/woh-dekhne-mein.mp3",
};

const tuJaanSong: Song = {
  title: "Tu Jaan Hai, Armaan Hai",
  src: "/music/tu-jaan-hai.mp3",
};

const bulleyaSong: Song = {
  title: "Bulleya",
  src: "/music/bulleya.mp3",
};

const teraYaarHoonMainSong: Song = {
  title: "Tera Yaar Hoon Main",
  src: "/music/tera-yaar-hoon-main.mp3",
};

const kabhiKabhiAditiSong: Song = {
  title: "Kabhi Kabhi Aditi",
  src: "/music/kabhi-kabhi-aditi.mp3",
};

const questions: Question[] = [
  {
    label: "QUESTION NO. 01 · FRIENDSHIP DEPARTMENT",
    title: "Oye, ek sawaal! 👀",
    description: "Ek important discussion karni hai...",
    question: "Thodi si bakwaas conversation karein? 😂",
    yesButton: "Haan re, bol! 😂",
    noButton: "Nahi re, bilkul nahi 🙄",
    yesMessage:
      "YAYYY! Mission thoda sa successful! Apni conversations mein logic kam aur bakwaas zyada hoti hai. Hehe!",
    noTitle: "Pehla jhatka, yaar! 😭",
    noMessage:
      "Ek chhoti si conversation maangi thi, TED Talk thodi na dena tha! Thik aahe madam, gaana suno.",
    song: {
      title: "Chalo Jaane Do",
      src: "/music/chalo-jaane-do.mp3",
    },
  },
  {
    label: "QUESTION NO. 02 · TIMEPASS DEPARTMENT",
    title: "Achha madam ji, suno! 🎧",
    description: "Thoda timepass, thode jokes, aur thoda music...",
    question: "Itna toh banta hai na, yaar? 😂",
    yesButton: "Haan re, banta hai! 😂",
    noButton: "Nahi re, apna kaam kar 🙄",
    yesMessage:
      "Kajal madam, dekhne mein toh seedhi-saadhi lagti ho… par asli kartoot toh alag hi hain! 😂 Chal, tere liye ek gaana banta hai!",
    noTitle: "Your Honour, ek minute! 😂",
    noMessage:
      "Arey wah! Itna attitude? Gaane ke through appeal toh karne do!",
    song: {
      title: "Didi Tera Devar Deewana",
      src: "/music/didi-tera-devar.mp3",
    },
  },
  {
    label: "QUESTION NO. 03 · FRIENDSHIP DEPARTMENT",
    title: "Oye, ek sawaal! 😂",
    description:
      "Meri harkatein kabhi-kabhi irritating hoti hain, maan liya...",
    question: "Par main itna bhi bura dost hoon kya? 😭😂",
    yesButton: "Nahi re, thoda sa hi 😂",
    noButton: "Thoda nahi, bahut zyada! 🙄",
    yesMessage:
      "Haan bas, itna kaafi hai! Baaki improvement ka scope hai. Aakhir dost hoon, perfect insaan thodi na!",
    noTitle: "AREEEE YAAR! 😭😂",
    noMessage:
      "Itna honest review bhi nahi dena tha! Thik aahe madam, feedback noted. Ab gaana suno aur thoda daya dikhao!",
    song: {
      title: "Tera Yaar Hoon Main",
      src: "/music/tera-yaar-hoon-main.mp3",
    },
  },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [screen, setScreen] = useState(0);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [audioError, setAudioError] = useState(false);

  const isOpening = screen === 0;
  const isSongInterlude = screen === 4;
  const isFinal = screen === 5;
  const questionIndex = screen - 1;
  const question = questions[questionIndex];

  function stopMusic() {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  function playSong(song: Song) {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentSong(song);
    setAudioError(false);

    audio.pause();
    audio.src = song.src;
    audio.currentTime = 0;
    audio.load();

    audio.play().catch(() => {
      setAudioError(true);
    });
  }

  function chooseYes() {
    stopMusic();
    setCurrentSong(null);
    setAudioError(false);
    setAnswer("yes");

    // Give each selected Yes response its own song.
    if (screen === 1) {
      playSong(yesFriendshipSong);
    } else if (screen === 2) {
      playSong(yesSecondSong);
    } else if (screen === 3) {
      playSong(teraYaarHoonMainSong);
    }
  }

  function chooseNo(song: Song) {
    setAnswer("no");
    playSong(song);
  }

  function nextScreen() {
    stopMusic();
    setCurrentSong(null);
    setAudioError(false);
    setAnswer(null);

    // After the third question, show a personal song dedication before the ending.
    if (screen === 3) {
      setScreen(4);
      playSong(dedicationSong);
      return;
    }

    setScreen((previous) => Math.min(previous + 1, 5));
  }

  function replaySong() {
    if (currentSong) {
      playSong(currentSong);
    }
  }

  function goBackToOpening() {
    stopMusic();
    setScreen(0);
    setAnswer(null);
    setCurrentSong(null);
    setAudioError(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 px-4 py-8 text-purple-950">
      <div className="pointer-events-none absolute left-5 top-8 text-3xl opacity-50">
        ♡
      </div>
      <div className="pointer-events-none absolute right-6 top-20 text-2xl opacity-50">
        ✨
      </div>
      <div className="pointer-events-none absolute bottom-10 left-8 text-2xl opacity-50">
        ♪
      </div>
      <div className="pointer-events-none absolute bottom-16 right-8 text-3xl opacity-50">
        ♡
      </div>

      <section className="relative w-full max-w-lg rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-pink-200/50 backdrop-blur-md sm:p-9">
        <audio
          ref={audioRef}
          preload="none"
          onError={() => {
            if (currentSong) setAudioError(true);
          }}
          onEnded={() => setAudioError(false)}
        />

        {isOpening && (
          <div className="text-center">
            <div className="mb-5 text-7xl" aria-hidden="true">
              💌
            </div>

            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-pink-600">
              TOP SECRET · FRIENDSHIP DEPARTMENT
            </p>

            <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
              Kajal, oye sun na... 👀
            </h1>

            <p className="mb-5 leading-7 text-purple-800">
              Kajal, tere liye kuch banaya hai. Thoda cute hai, thoda weird hai...
              bilkul meri harkaton ki tarah. 😂
            </p>

            <h2 className="mb-7 text-xl font-bold">
              Dekhegi kya? 🙈
            </h2>

            {answer === null && (
              <div className="grid gap-3">
                <button
                  onClick={chooseYes}
                  className="rounded-2xl bg-pink-500 px-5 py-4 font-bold text-white transition hover:bg-pink-600 active:scale-95"
                >
                  Haan, dikha jaldi! 😂
                </button>

                <button
                  onClick={() => chooseNo(openingSong)}
                  className="rounded-2xl bg-pink-100 px-5 py-4 font-bold text-purple-900 transition hover:bg-pink-200 active:scale-95"
                >
                  Nahi, bilkul nahi 🙄
                </button>
              </div>
            )}

            {answer === "yes" && (
              <Response
                message="Arey waah! Permission mil gayi! Aaj toh apni sunwai ho rahi hai! 😂 Chal, pehla sawaal poochhta hoon. Tension nako gheu, exam nahi hai!"
                buttonText="Chal, poochh →"
                onNext={nextScreen}
              />
            )}

            {answer === "no" && (
              <NoResponse
                title="Kajal, opening mein hi rejection! 😭"
                message="Kajal, itni mehnat se banaya aur madam ka attitude dekho! Achha baba, pehle gaana sun le."
                song={currentSong}
                audioError={audioError}
                onReplay={replaySong}
                onNext={nextScreen}
              />
            )}
          </div>
        )}

        {!isOpening && !isFinal && question && (
          <div className="text-center">
            <div className="mb-5 text-6xl" aria-hidden="true">
              {screen === 1 ? "😂" : screen === 2 ? "🎧" : "🙈"}
            </div>

            <p className="mb-3 text-xs font-bold tracking-widest text-pink-600">
              {question.label}
            </p>

            <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
              {question.title}
            </h1>

            <p className="mb-5 leading-7 text-purple-800">
              {question.description}
            </p>

            <h2 className="mb-7 text-xl font-bold leading-relaxed">
              {question.question}
            </h2>

            {answer === null && (
              <div className="grid gap-3">
                <button
                  onClick={chooseYes}
                  className="rounded-2xl bg-pink-500 px-5 py-4 font-bold text-white transition hover:bg-pink-600 active:scale-95"
                >
                  {question.yesButton}
                </button>

                <button
                  onClick={() => chooseNo(question.song)}
                  className="rounded-2xl bg-pink-100 px-5 py-4 font-bold text-purple-900 transition hover:bg-pink-200 active:scale-95"
                >
                  {question.noButton}
                </button>
              </div>
            )}

            {answer === "yes" && (
              <Response
                message={question.yesMessage}
                buttonText={
                  screen === 3 ? "Surprise reveal kar →" : "Agla sawaal →"
                }
                onNext={nextScreen}
                song={currentSong}
                audioError={audioError}
                onReplay={replaySong}
              />
            )}

            {answer === "no" && (
              <NoResponse
                title={question.noTitle}
                message={question.noMessage}
                song={currentSong}
                audioError={audioError}
                onReplay={replaySong}
                onNext={nextScreen}
              />
            )}
          </div>
        )}

        {isSongInterlude && (
          <div className="text-center">
            <div className="mb-5 text-7xl" aria-hidden="true">
              🎶
            </div>

            <p className="mb-3 text-xs font-bold tracking-widest text-pink-600">
              A LITTLE EXTRA · JUST FOR YOU
            </p>

            <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
              Ek filmy si baat, Kajal... 💗
            </h1>

            <p className="mb-4 leading-7 text-purple-800">
              Tu thodi-thodi nadaan hai, thodi dramatic bhi 😂
              par apni random baaton, hasi aur bakwaas ke liye genuinely special hai.
            </p>

            <div className="mb-5 rounded-2xl bg-pink-100 p-4 text-left leading-7 text-purple-900">
              Lyrics thode filmy hain, toh zyada serious mat lena, madam ji.
              Dosti mein thoda drama aur ek gaana toh banta hai na! 😂
            </div>

            <div className="mb-5 rounded-2xl border border-pink-200 bg-white/80 p-4">
              <p className="mb-3 text-sm font-semibold text-purple-800">
                🎵 Now playing: {currentSong?.title ?? dedicationSong.title}
              </p>

              {audioError && (
                <p role="status" className="mb-3 text-sm text-red-700">
                  Song play nahi ho paaya. Audio file check karo ya dobara try karo.
                </p>
              )}

              <div className="grid gap-2">
                <button
                  onClick={() => playSong(teraYaarHoonMainSong)}
                  className="w-full rounded-xl bg-pink-200 px-4 py-3 font-bold text-purple-950 transition hover:bg-pink-300"
                >
                  Play Tera Yaar Hoon Main 💗
                </button>
                <button
                  onClick={() => playSong(kabhiKabhiAditiSong)}
                  className="w-full rounded-xl bg-purple-100 px-4 py-3 font-bold text-purple-950 transition hover:bg-purple-200"
                >
                  Play Kabhi Kabhi Aditi ☀️
                </button>
                <button
                  onClick={() => playSong(bulleyaSong)}
                  className="w-full rounded-xl bg-rose-100 px-4 py-3 font-bold text-purple-950 transition hover:bg-rose-200"
                >
                  Play Bulleya (emotional song) 🎧
                </button>
                <button
                  onClick={() => playSong(wohDekhneMeinSong)}
                  className="w-full rounded-xl bg-pink-100 px-4 py-3 font-bold text-purple-950 transition hover:bg-pink-200"
                >
                  Play Woh Dekhne Mein 🎶
                </button>
                <button
                  onClick={() => playSong(tuJaanSong)}
                  className="w-full rounded-xl border border-pink-200 px-4 py-3 font-bold text-purple-950 transition hover:bg-pink-50"
                >
                  Play Tu Jaan Hai, Armaan Hai 🎶
                </button>
                <p className="text-left text-sm leading-6 text-purple-700">
                  Bulleya emotional hai, aur Woh Dekhne Mein / Tu Jaan Hai, Armaan Hai thode romantic-sounding lag sakte hain. Isliye ye optional songs hain, kisi Yes/No answer ka signal nahi. Yeh surprise sirf dosti ke liye hai. 😂
                </p>
                <button
                  onClick={replaySong}
                  className="w-full rounded-xl border border-pink-200 px-4 py-3 font-bold text-purple-950 transition hover:bg-pink-50"
                >
                  Replay current song ↻
                </button>
              </div>
            </div>

            <button
              onClick={nextScreen}
              className="w-full rounded-2xl bg-pink-500 px-5 py-4 font-bold text-white transition hover:bg-pink-600 active:scale-95"
            >
              Okay madam, ab final surprise dikha → 😂
            </button>
          </div>
        )}

        {isFinal && (
          <div className="text-center">
            <div className="mb-5 text-7xl" aria-hidden="true">
              🥳
            </div>

            <p className="mb-3 text-xs font-bold tracking-widest text-pink-600">
              FRIENDSHIP SURPRISE · COMPLETE
            </p>

            <h1 className="mb-5 text-3xl font-extrabold sm:text-4xl">
              Kajal, bas itna hi tha! 😂
            </h1>

            <p className="mb-5 leading-7 text-purple-800">
              Kajal madam, website ka review dena mat bhoolna. Itni mehnat ki hai
              maine! 🙄
            </p>

            <p className="mb-6 leading-7 text-purple-800">
              Jab tera mann ho, thoda timepass karenge. Thodi gossip, thode
              jokes, aur apni usual bakwaas. No pressure, no drama... okay,
              thoda drama toh chalega. 😂
            </p>

            <div className="mb-6 rounded-2xl bg-pink-100 p-4 text-lg font-bold">
              Kajal, ab ek smile toh banti hai, yaar! 😂
            </div>

            <div className="mb-5 rounded-2xl border border-pink-200 bg-white/80 p-4">
              <p className="mb-3 text-sm font-semibold text-purple-800">
                {currentSong?.title === kabhiKabhiAditiSong.title
                  ? `🎵 Now playing: ${kabhiKabhiAditiSong.title}`
                  : "Ek last feel-good gaana, Kajal ke liye 🎶"}
              </p>
              {audioError && (
                <p role="status" className="mb-3 text-sm text-red-700">
                  Song play nahi ho paaya. Audio file check karo ya dobara try karo.
                </p>
              )}
              <button
                onClick={() => playSong(kabhiKabhiAditiSong)}
                className="w-full rounded-xl bg-pink-200 px-4 py-3 font-bold text-purple-950 transition hover:bg-pink-300"
              >
                {currentSong?.title === kabhiKabhiAditiSong.title
                  ? "Replay Kabhi Kabhi Aditi 🎶"
                  : "Play Kabhi Kabhi Aditi 🎶"}
              </button>
            </div>

            <button
              onClick={goBackToOpening}
              className="rounded-2xl bg-pink-500 px-5 py-3 font-bold text-white transition hover:bg-pink-600 active:scale-95"
            >
              Ek baar phir se dekho ↺
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-purple-500">
          Made with effort, friendship, and thoda sa drama.
        </p>
      </section>
    </main>
  );
}

function Response({
  message,
  buttonText,
  onNext,
  song = null,
  audioError = false,
  onReplay,
}: {
  message: string;
  buttonText: string;
  onNext: () => void;
  song?: Song | null;
  audioError?: boolean;
  onReplay?: () => void;
}) {
  return (
    <div className="space-y-5">
      <div
        role="status"
        className="rounded-2xl bg-pink-100 p-4 text-left leading-7 text-purple-900"
      >
        {message}
      </div>

      {song && (
        <div className="rounded-2xl border border-pink-200 bg-white/80 p-4">
          <p className="mb-3 text-sm font-semibold text-purple-800">
            🎵 Now playing: {song.title}
          </p>

          {audioError && (
            <p role="status" className="mb-3 text-sm text-red-700">
              Song play nahi ho paaya. Audio file check karo ya dobara try karo.
            </p>
          )}

          {onReplay && (
            <button
              onClick={onReplay}
              className="w-full rounded-xl bg-pink-200 px-4 py-3 font-bold text-purple-950 transition hover:bg-pink-300"
            >
              Replay song 🎶
            </button>
          )}
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full rounded-2xl bg-pink-500 px-5 py-4 font-bold text-white transition hover:bg-pink-600 active:scale-95"
      >
        {buttonText}
      </button>
    </div>
  );
}

function NoResponse({
  title,
  message,
  song,
  audioError,
  onReplay,
  onNext,
}: {
  title: string;
  message: string;
  song: Song | null;
  audioError: boolean;
  onReplay: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-pink-100 p-4 text-left">
        <h3 className="mb-2 text-lg font-extrabold">{title}</h3>
        <p className="leading-7 text-purple-900">{message}</p>
      </div>

      {song && (
        <div className="rounded-2xl border border-pink-200 bg-white/80 p-4">
          <p className="mb-3 text-sm font-semibold text-purple-800">
            🎵 Now playing: {song.title}
          </p>

          {audioError && (
            <p role="status" className="mb-3 text-sm text-red-700">
              Song abhi play nahi ho paaya. Audio file check karo ya neeche
              diye gaye button se dobara try karo.
            </p>
          )}

          <button
            onClick={onReplay}
            className="w-full rounded-xl bg-pink-200 px-4 py-3 font-bold text-purple-950 transition hover:bg-pink-300"
          >
            Replay song 🎶
          </button>
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full rounded-2xl bg-pink-500 px-5 py-4 font-bold text-white transition hover:bg-pink-600 active:scale-95"
      >
        Achha baba, aage chalo →
      </button>
    </div>
  );
}
  