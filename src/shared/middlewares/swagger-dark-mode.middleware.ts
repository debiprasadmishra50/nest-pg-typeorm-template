import { Request, Response, NextFunction } from 'express';

const DARK_MODE_SCRIPT = `
<script>
  (function() {
    function addDarkModeToggle() {
      if (document.querySelector('.dark-mode-toggle')) return;
      
      let targetElement = document.querySelector('.btn.authorize') ||
                         document.querySelector('.swagger-ui .info') ||
                         document.querySelector('.swagger-ui .wrapper');
      if (!targetElement) {
        setTimeout(addDarkModeToggle, 500);
        return;
      }
      
      const toggleContainer = document.createElement('div');
      toggleContainer.className = 'dark-mode-toggle';
      toggleContainer.style.cssText = 'display: inline-flex; align-items: center; margin-left: 10px; font-size: 14px;';
      
      const toggleSwitch = document.createElement('label');
      toggleSwitch.style.cssText = 'position: relative; display: inline-block; width: 50px; height: 24px; margin-right: 8px;';
      
      const toggleInput = document.createElement('input');
      toggleInput.type = 'checkbox';
      toggleInput.style.cssText = 'opacity: 0; width: 0; height: 0;';
      
      const toggleSlider = document.createElement('span');
      toggleSlider.style.cssText = 'position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;';
      
      const toggleSliderBefore = document.createElement('span');
      toggleSliderBefore.style.cssText = 'position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;';
      
      toggleSlider.appendChild(toggleSliderBefore);
      toggleSwitch.appendChild(toggleInput);
      toggleSwitch.appendChild(toggleSlider);
      
      const toggleLabel = document.createElement('span');
      toggleLabel.textContent = 'Dark Mode';
      toggleLabel.style.cssText = 'font-weight: 600;';
      
      toggleContainer.appendChild(toggleSwitch);
      toggleContainer.appendChild(toggleLabel);
      
      const isDarkMode = localStorage.getItem('swagger-dark-mode') === 'true';
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        toggleInput.checked = true;
        toggleSlider.style.backgroundColor = '#4CAF50';
        toggleSliderBefore.style.transform = 'translateX(26px)';
      }
      
      toggleInput.addEventListener('change', function() {
        const isChecked = this.checked;
        document.body.classList.toggle('dark-mode', isChecked);
        toggleSlider.style.backgroundColor = isChecked ? '#4CAF50' : '#ccc';
        toggleSliderBefore.style.transform = isChecked ? 'translateX(26px)' : 'translateX(0)';
        localStorage.setItem('swagger-dark-mode', isChecked.toString());
      });
      
      if (targetElement.classList.contains('authorize')) {
        targetElement.parentNode.insertBefore(toggleContainer, targetElement.nextSibling);
      } else {
        (targetElement.querySelector('.info') || targetElement || document.body).appendChild(toggleContainer);
      }
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(addDarkModeToggle, 100);
      });
    } else {
      setTimeout(addDarkModeToggle, 100);
    }
    
    setTimeout(addDarkModeToggle, 300);
    setTimeout(addDarkModeToggle, 500);
    setTimeout(addDarkModeToggle, 1000);
  })();
</script>
`;

export function swaggerDarkModeMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.url === '' || req.url === '/') {
    const originalSend = res.send;
    res.send = function (body: any) {
      if (typeof body === 'string' && body.includes('swagger-ui')) {
        body = body.replace('</body>', `${DARK_MODE_SCRIPT}</body>`);
      }
      return originalSend.call(this, body);
    };
  }
  next();
}
