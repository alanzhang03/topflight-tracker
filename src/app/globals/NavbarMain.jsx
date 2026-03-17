'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './NavbarMain.module.scss';

const NavbarMain = () => {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <ul className={styles.navbarMenu}>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/favorites'>Favorites</Link>
          </li>
          <li>
            <Link href='/leagues/premier-league'>Premier League</Link>
          </li>
          <li>
            <Link href='/leagues/la-liga'>La Liga</Link>
          </li>
          <li>
            <Link href='/leagues/champions-league'>Champions League</Link>
          </li>
          <li>
            <Link href='/leagues/bundesliga'>Bundesliga</Link>
          </li>
        </ul>
        <div className={styles.authSection}>
          {session ? (
            <div className={styles.userInfo}>
              <span>{session.user.name}</span>
              <button onClick={() => signOut()} className={styles.authButton}>
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('google')}
              className={styles.authButton}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
