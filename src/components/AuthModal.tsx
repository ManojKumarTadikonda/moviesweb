import { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSwitchMode: (mode: 'login' | 'signup') => void;
  onLoginSuccess: (_id: string, name: string, token: string,email:string) => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode, onLoginSuccess }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isOtpStep, setIsOtpStep] = useState(false); // Track OTP verification step

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // OTP Verification Step
    if (isOtpStep) {
      try {
        const otpResponse = await fetch('https://moviebooking-13wh.onrender.com/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }),
        });

        const otpData = await otpResponse.json();
        if (!otpResponse.ok) throw new Error(otpData.message || 'OTP verification failed');

        alert('Signup and OTP verification successful!');
        setSuccessMessage('OTP verified successfully! You can now log in.');
        setIsOtpStep(false); // Reset OTP step
        onSwitchMode('login'); // Switch to login
      } catch (err: any) {
        setError('Error: ' + err.message);
      }
      return;
    }

    // Signup/Login Step
    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    let payload: any = mode === 'signup' ? { email, username, password, confirmPassword } : { email, password };
    const apiUrl = mode === 'signup' ? 'https://moviebooking-13wh.onrender.com/api/auth/signup' : 'https://moviebooking-13wh.onrender.com/api/auth/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      if (mode === 'signup') {
        setIsOtpStep(true); // Show OTP input field
        setSuccessMessage('OTP sent to your email. Please enter it below.');
      } else {
        alert('Welcome ' + data.username);
        console.log(data)
        onLoginSuccess(data._id || '_id', data.username || 'User', data.token || 'token',data.email);
        onClose();
      }
    } catch (err: any) {
      setError('Error: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {isOtpStep ? 'Verify OTP' : mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isOtpStep ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                    placeholder="Enter your full name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                placeholder="Enter OTP sent to email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors">
            {isOtpStep ? 'Verify OTP' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {!isOtpStep && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')} className="ml-1 text-pink-600 hover:text-pink-700">
                {mode === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
