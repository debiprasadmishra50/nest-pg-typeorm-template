export const SWAGGER_CUSTOM_CSS = `
/* Hide only the search bar and download wrapper, keep the header */
        .swagger-ui .topbar .download-url-wrapper { display: none !important; } 
        .swagger-ui .topbar-wrapper .topbar .download-url-wrapper { display: none !important; }
        
        /* Dark Mode Styles */
        body.dark-mode .swagger-ui {
          background-color: #1a1a1a !important;
        }
        body.dark-mode .swagger-ui .info .title {
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .info .description {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .opblock-tag {
          background-color: #2d2d2d !important;
          color: #ffffff !important;
          border-color: #404040 !important;
        }
        body.dark-mode .swagger-ui .opblock {
          background-color: #2d2d2d !important;
          border-color: #404040 !important;
        }
        body.dark-mode .swagger-ui .opblock .opblock-summary {
          background-color: #333333 !important;
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .opblock .opblock-summary-path {
          color: #61affe !important;
        }
        body.dark-mode .swagger-ui .opblock .opblock-summary-description {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .opblock-body {
          background-color: #2d2d2d !important;
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .parameters-col_description p,
        body.dark-mode .swagger-ui .parameters-col_description div {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .parameter__name {
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .parameter__type {
          color: #61affe !important;
        }
        body.dark-mode .swagger-ui .tab li {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .tab li.active {
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .response-col_description {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .response-col_status {
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .model-title {
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .prop-name {
          color: #61affe !important;
        }
        body.dark-mode .swagger-ui .prop-type {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .renderedMarkdown p {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui table thead tr th {
          color: #ffffff !important;
          background-color: #333333 !important;
        }
        body.dark-mode .swagger-ui table tbody tr td {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .model-container {
          background-color: #2d2d2d !important;
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .model {
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .model .model-title {
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .model-box {
          background-color: #333333 !important;
        }
        body.dark-mode .swagger-ui .opblock-body .parameters-container .parameters-col_description {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .parameters .parameters-col_description {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .models h4 {
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .models .model-container > .model-box > .model-title {
          color: #ffffff !important;
        }
        body.dark-mode .swagger-ui .models .model-container {
          background-color: #2d2d2d !important;
        }
        body.dark-mode .swagger-ui .expand-operation svg,
        body.dark-mode .swagger-ui .opblock-tag svg,
        body.dark-mode .swagger-ui .model-toggle svg,
        body.dark-mode .swagger-ui .models svg {
          fill: #ffffff !important;
        }
        body.dark-mode .swagger-ui .opblock-body .parameters .parameters-col_description,
        body.dark-mode .swagger-ui .parameters-container .parameters-col_description,
        body.dark-mode .swagger-ui .opblock-section .opblock-section-header + div {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .opblock-body .parameters-container > div {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .opblock-body .parameters-container {
          color: #cccccc !important;
        }
        body.dark-mode .swagger-ui .opblock-body .parameters-container * {
          color: #cccccc !important;
        }
        
        /* Additional styles for response sections and buttons */
        body.dark-mode .swagger-ui .btn.btn-clear {
          background: #404040 !important;
          color: #e0e0e0 !important;
          border: 1px solid #606060 !important;
        }
        
        body.dark-mode .swagger-ui .btn.btn-clear:hover {
          background: #505050 !important;
        }
        
        body.dark-mode .swagger-ui .responses-inner h4,
        body.dark-mode .swagger-ui .responses-inner h5 {
          color: #e0e0e0 !important;
        }
        
        body.dark-mode .swagger-ui .response-col_links {
          color: #e0e0e0 !important;
        }
        
        body.dark-mode .swagger-ui .request-url pre {
          color: #e0e0e0 !important;
          background: #2d2d2d !important;
        }
        
        body.dark-mode .swagger-ui .curl-command {
          color: #e0e0e0 !important;
          background: #2d2d2d !important;
        }
        
        body.dark-mode .swagger-ui .curl-command h4 {
          color: #e0e0e0 !important;
        }
        
        body.dark-mode .swagger-ui .request-url h4 {
          color: #e0e0e0 !important;
        }
        
        body.dark-mode .swagger-ui .opblock-body pre {
          
          color: #e0e0e0 !important;
        }
        
        body.dark-mode .swagger-ui .copy-to-clipboard {
          background: #404040 !important;
          color: #e0e0e0 !important;
        }
        
        body.dark-mode .swagger-ui .copy-to-clipboard:hover {
          background: #505050 !important;
        }

      `;
