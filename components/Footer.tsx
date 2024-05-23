function Footer({ className }) {
  return (
    <footer
      className={`flex bg-white  dark:bg-[#1E1924]  p-4 justify-between ${className}`}
    >
      <span className="text-sm text-[#9B92B2] sm:text-center dark:text-gray-400">
        © 2023{" "}
        <a
          href="https://twitter.com/openbookdex"
          className="hover:text-[#ab82ae]"
        >
          Openbook Team
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a
            href="https://twitter.com/openbookdex"
            className="mr-4 hover:text-[#ab82ae] md:mr-6"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://github.com/openbook-dex"
            className="mr-4 hover:text-[#ab82ae] md:mr-6"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="gofuckyourselfifyouwanttocontactus@weloveyou.shit"
            className="hover:text-[#ab82ae]"
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
