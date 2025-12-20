"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useUser } from "@/firebase";
import { initiateEmailSignIn, initiateEmailSignUp, initiateGoogleSignIn } from "@/firebase/non-blocking-login";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { NexConnectLogo } from "@/components/NexConnectLogo";


const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.619-3.317-11.28-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.16-4.087 5.571l6.19 5.238C42.012 36.49 44 30.823 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const auth = useAuth();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (user) {
            router.push('/locker');
        }
    }, [user, router]);

    const handleGoogleSignIn = () => {
        initiateGoogleSignIn(auth);
    };

    const handleEmailAuth = () => {
        if (isLogin) {
            initiateEmailSignIn(auth, email, password);
        } else {
            initiateEmailSignUp(auth, email, password);
        }
    };

    if (isUserLoading || user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-50">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-50">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
           <div className="relative w-28 h-28 mx-auto mb-4">
              <NexConnectLogo />
            </div>
          <CardTitle className="font-headline text-2xl">{isLogin ? 'Welcome Back' : 'Create an Account'}</CardTitle>
          <CardDescription>{isLogin ? 'Log in to continue to NexConnect.' : 'Join NexConnect to get started.'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                <GoogleIcon />
                Sign {isLogin ? 'in' : 'up'} with Google
             </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="tunde@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

            <Button className="w-full" onClick={handleEmailAuth}>{isLogin ? 'Log In' : 'Create Account'}</Button>

           <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="underline underline-offset-4 hover:text-primary"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
