// Enhanced typing effect that handles formatting in real-time - NORMAL SPEED
function showEnhancedTypingEffect(text, textElement, incomingMessageDiv) {
    // Parse the formatting first
    const segments = window.messageUtils.parseFormattingElements(text);
  
    // Convert segments to a flat array of characters with formatting info
    const characters = [];
    
    segments.forEach(segment => {
      if (segment.lineBreak) {
        characters.push({ 
          char: '<br>', 
          bold: false, 
          lineBreak: true 
        });
      } else {
        for (const char of segment.text) {
          characters.push({ 
            char, 
            bold: segment.bold 
          });
        }
      }
    });
  
    // Clear the text element
    textElement.innerHTML = '';
  
    // Set up variables for the typing effect
    let currentCharIndex = 0;
    let currentHTML = '';
    let inBoldSegment = false;
  
    // Speed up the typing effect
    const typingInterval = setInterval(() => {
      // Process multiple characters per interval for a faster effect
      for (let i = 0; i < 5; i++) { // Typing 5 characters at once for speed
        if (currentCharIndex >= characters.length) {
          clearInterval(typingInterval);
          window.chatApp.isResponseGenerating = false;
  
          const icon = incomingMessageDiv.querySelector(".icon");
          if (icon) icon.classList.remove("hide");
  
          // Save to local storage
          localStorage.setItem("saved-chats", window.chatApp.chatContainer.innerHTML);
          localStorage.setItem("chat-context", JSON.stringify(window.chatApp.context));
          break;
        }
  
        const charInfo = characters[currentCharIndex];
  
        // Handle bold text formatting
        if (charInfo.bold && !inBoldSegment) {
          currentHTML += '<strong>';
          inBoldSegment = true;
        } else if (!charInfo.bold && inBoldSegment) {
          currentHTML += '</strong>';
          inBoldSegment = false;
        }
  
        // Handle line breaks
        if (charInfo.lineBreak) {
          currentHTML += '<br>';
        } else {
          currentHTML += charInfo.char;
        }
  
        currentCharIndex++;
      }
  
      // Close any open bold tag at the end
      if (inBoldSegment && currentCharIndex >= characters.length) {
        currentHTML += '</strong>';
      }
  
      // Update the text element with the current HTML
      textElement.innerHTML = currentHTML;
  
      // Hide the typing indicator
      const icon = incomingMessageDiv.querySelector(".icon");
      if (icon) icon.classList.add("hide");
  
      // Scroll to keep the latest text visible
      window.chatApp.chatContainer.scrollTo(0, window.chatApp.chatContainer.scrollHeight);
    }, 20); // Much faster interval (20ms) for a smoother effect
  }
  
  // SLOWER typing effect specifically for welcome message
  function showSlowerTypingEffect(text, textElement, incomingMessageDiv) {
    // Parse the formatting first
    const segments = window.messageUtils.parseFormattingElements(text);
  
    // Convert segments to a flat array of characters with formatting info
    const characters = [];
    
    segments.forEach(segment => {
      if (segment.lineBreak) {
        characters.push({ 
          char: '<br>', 
          bold: false, 
          lineBreak: true 
        });
      } else {
        for (const char of segment.text) {
          characters.push({ 
            char, 
            bold: segment.bold 
          });
        }
      }
    });
  
    // Clear the text element
    textElement.innerHTML = '';
  
    // Set up variables for the typing effect
    let currentCharIndex = 0;
    let currentHTML = '';
    let inBoldSegment = false;
  
    // SLOWER typing effect for welcome message
    const typingInterval = setInterval(() => {
      // Process just ONE character per interval for a slower effect
      if (currentCharIndex >= characters.length) {
        clearInterval(typingInterval);
        window.chatApp.isResponseGenerating = false;
  
        const icon = incomingMessageDiv.querySelector(".icon");
        if (icon) icon.classList.remove("hide");
  
        // Save to local storage
        localStorage.setItem("saved-chats", window.chatApp.chatContainer.innerHTML);
        localStorage.setItem("chat-context", JSON.stringify(window.chatApp.context));
        return;
      }
  
      const charInfo = characters[currentCharIndex];
  
      // Handle bold text formatting
      if (charInfo.bold && !inBoldSegment) {
        currentHTML += '<strong>';
        inBoldSegment = true;
      } else if (!charInfo.bold && inBoldSegment) {
        currentHTML += '</strong>';
        inBoldSegment = false;
      }
  
      // Handle line breaks
      if (charInfo.lineBreak) {
        currentHTML += '<br>';
      } else {
        currentHTML += charInfo.char;
      }
  
      currentCharIndex++;
  
      // Close any open bold tag at the end
      if (inBoldSegment && currentCharIndex >= characters.length) {
        currentHTML += '</strong>';
      }
  
      // Update the text element with the current HTML
      textElement.innerHTML = currentHTML;
  
      // Hide the typing indicator
      const icon = incomingMessageDiv.querySelector(".icon");
      if (icon) icon.classList.add("hide");
  
      // Scroll to keep the latest text visible
      window.chatApp.chatContainer.scrollTo(0, window.chatApp.chatContainer.scrollHeight);
    }, 70); // Slower interval (70ms) for the welcome message
  }
  
  // Make functions available to other files
  window.typingEffects = {
    showEnhancedTypingEffect,
    showSlowerTypingEffect
  };