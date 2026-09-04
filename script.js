 
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

 
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  
  const quizData = [
    { text: '"Dear customer, your KYC will expire today. Update immediately at bit.ly/kyc-update2 or your account will be blocked."', isScam: true, explain: 'Real banks never send KYC links through shortened URLs over SMS. This link likely installs a fake app that steals your data.' },
    { text: 'A message from your SHG leader in the group chat: "Reminder — our meeting is tomorrow at 4pm at the usual place."', isScam: false, explain: 'This is a normal, expected message from someone you know, sent in your existing group — no links, no urgency, no money involved.' },
    { text: '"Congratulations! Your number has won ₹25,000 in the Kaun Banega Crorepati lucky draw. Pay ₹500 processing fee to claim."', isScam: true, explain: 'You cannot win a contest you never entered. Any prize that asks you to pay first is a scam.' },
    { text: 'A call from someone saying, "This is your bank. Please tell me the OTP you just received so we can verify your card."', isScam: true, explain: 'No bank employee will ever ask for your OTP over a phone call. Hang up and call your bank\'s official number directly.' },
    { text: 'Your daughter sends a message: "Reached college safely, will call you after class."', isScam: false, explain: 'A routine, expected message from a known family member with no requests for money or personal details.' },
    { text: 'A WhatsApp message from an unknown number: "I am from your gas agency. Your subsidy of ₹1,200 is pending — share your bank PIN to receive it."', isScam: true, explain: 'No agency or company ever needs your PIN to send you money. Sharing a PIN gives them access to withdraw money, not deposit it.' }
  ];
  let qIndex = 0;
  let score = 0;
  let answered = false;

  const quizMsg = document.getElementById('quizMsg');
  const quizTitle = document.getElementById('quizTitle');
  const scoreVal = document.getElementById('scoreVal');
  const quizFeedback = document.getElementById('quizFeedback');
  const quizNext = document.getElementById('quizNext');
  const btnSafe = document.getElementById('btnSafe');
  const btnScam = document.getElementById('btnScam');

  function loadQuestion() {
    answered = false;
    const q = quizData[qIndex];
    quizTitle.textContent = `Message ${qIndex + 1} of ${quizData.length}`;
    quizMsg.textContent = q.text;
    quizFeedback.className = 'quiz-feedback';
    quizFeedback.textContent = '';
    quizNext.classList.remove('show');
    btnSafe.disabled = false;
    btnScam.disabled = false;
  }

  function answer(userSaysScam) {
    if (answered) return;
    answered = true;
    const q = quizData[qIndex];
    const correct = userSaysScam === q.isScam;
    if (correct) score++;
    scoreVal.textContent = score;
    quizFeedback.textContent = (correct ? 'Correct — ' : 'Not quite — ') + q.explain;
    quizFeedback.className = 'quiz-feedback show ' + (correct ? 'correct' : 'wrong');
    quizNext.classList.add('show');
    quizNext.textContent = qIndex === quizData.length - 1 ? 'See final score' : 'Next message';
  }

  btnSafe.addEventListener('click', () => answer(false));
  btnScam.addEventListener('click', () => answer(true));

  quizNext.addEventListener('click', () => {
    qIndex++;
    if (qIndex >= quizData.length) {
      quizTitle.textContent = 'Quiz complete!';
      quizMsg.textContent = `You scored ${score} out of ${quizData.length}. ${score === quizData.length ? 'Perfect — you\'re ready to help others in your group spot these too.' : 'Review the tips above and try again anytime.'}`;
      document.getElementById('quizActions').style.display = 'none';
      quizFeedback.className = 'quiz-feedback';
      quizNext.textContent = 'Start over';
      quizNext.classList.add('show');
      quizNext.onclick = () => {
        qIndex = 0; score = 0; scoreVal.textContent = 0;
        document.getElementById('quizActions').style.display = 'flex';
        quizNext.onclick = null;
        loadQuestion();
      };
    } else {
      loadQuestion();
    }
  });

  loadQuestion();
