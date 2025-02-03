export function Footer(): JSX.Element {
  return (
    <div className="bg-pocket-blue text-white py-16 px-4">
      <div className="flex lg:flex-row flex-col-reverse justify-between max-w-3xl mx-auto gap-8">
        <div>
          <div>
            <h3 className="font-medium text-lg">Stay Updated</h3>
            <p className="max-w-md opacity-80">
              Come and help us grow the POKT community alongside the protocol. Join our social media
              channels.
            </p>
          </div>
          <div className="flex gap-6 items-center mt-6">
            <a href="http://bit.ly/PocketDiscordInvite" target="_blank" rel="noopener noreferrer">
              <img src="images/social/discord.svg" alt="Discord logo" className="w-6 h-6" />
            </a>
            <a href="https://github.com/pokt-network" target="_blank" rel="noopener noreferrer">
              <img src="images/social/github.svg" alt="GitHub logo" className="w-6 h-6" />
            </a>
            <a href="https://t.me/POKTnetwork" target="_blank" rel="noopener noreferrer">
              <img src="images/social/telegram.svg" alt="Telegram logo" className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/POKTnetwork" target="_blank" rel="noopener noreferrer">
              <img src="images/social/x.svg" alt="X logo" className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/pocket-network-foundation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="images/social/linkedin.svg" alt="LinkedIn logo" className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="flex">
          <ul className="flex gap-8">
            <div>
              <div className="font-medium text-lg">Resources</div>
              <div className="flex flex-col opacity-80">
                <a href="https://docs.pokt.network/">Documentation</a>
                <a href="https://pocket.network/terms-of-use/">Terms Of Use</a>
                <a href="https://pocket.network/privacy-policy/">Privacy Policy</a>
                <a href="https://pocket.network/">Website</a>
              </div>
            </div>
            <div>
              <div className="font-medium text-lg">Community</div>
              <div className="flex flex-col opacity-80">
                <a href="https://discord.com/invite/WRh7fMJ">Join Discord</a>
                <a href="https://forum.pokt.network/">Forum</a>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
