// This script will create an animated background pattern and
// move the back button to the right side of the page

// Function to move the back button to the right
function moveBackButtonToRight() {
    const backButton = document.querySelector('.nav-icon');
    
    if (backButton) {
      // Remove the button from its current position
      backButton.parentNode.removeChild(backButton);
      
      // Create a container for the button at the right side
      const buttonContainer = document.createElement('div');
      buttonContainer.style.position = 'fixed';
      buttonContainer.style.top = '20px';
      buttonContainer.style.right = '20px';
      buttonContainer.style.zIndex = '1000';
      
      // Append the button to the container
      buttonContainer.appendChild(backButton);
      
      // Add the container to the document
      document.body.appendChild(buttonContainer);
    }
  }
  
  // Function to create an animated background
  function createAnimatedBackground() {
    // Create a canvas element for the background animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Style the canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.5'; // Keep the animation subtle
    
    // Add canvas to page
    document.body.appendChild(canvas);
    
    // Handle window resize
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    // Animation variables
    let time = 0;
    const particles = [];
    const particleCount = 50;
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        hue: Math.random() * 360
      });
    }
    
    // Animate function
    function animate() {
      // Create a white background that's nearly transparent
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Slowly change particle color
        particle.hue = (particle.hue + 0.2) % 360;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, 0.7)`;
        ctx.fill();
      });
      
      // Connect nearby particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Calculate alpha based on distance
            const alpha = 1 - distance / 100;
            
            // Use average hue of both particles
            const hue = (particles[i].hue + particles[j].hue) / 2;
            
            ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      // Add subtle wave effect to the background
      time += 0.01;
      
      // Request the next animation frame
      requestAnimationFrame(animate);
    }
    
    // Set a semi-transparent white background on the body to ensure content readability
    document.body.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
    
    // Start the animation
    animate();
  }
  
  // Execute the functions when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    moveBackButtonToRight();
    createAnimatedBackground();
  });