import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer id="footer" className="bg-dark text-white mt-5 p-2 text-center">
         Coypright &copy; {new Date().getFullYear()} Smallulu World 
      </footer>
    </div>
  )
}
