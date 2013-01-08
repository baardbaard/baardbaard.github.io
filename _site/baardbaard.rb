require 'sinatra'
require 'pony'

set :public, Proc.new { File.join(root, "_site") }

# This before filter ensures that your pages are only ever served 
# # once (per deploy) by Sinatra, and then by Varnish after that
#
before do
	response.headers['Cache-Control'] = 'public, max-age=31557600' # 1 year
end

get '/' do
	File.read('_site/index.html')
end

not_found do
	"Your page cannot be found."
end

post '/contact' do
	Pony.mail(
		:from => params[:email],
		:to => 'stef@baardbaard.nl',
		:cc => params[:email],
		:subject => "Bericht van " + params[:email] + " op baardbaard.nl",
		:body => params[:message],
		:port => '587',
		:via => :smtp,
		:via_options => { 
			:address              => 'smtp.sendgrid.net', 
			:port                 => '587', 
			:enable_starttls_auto => true, 
			:user_name            => ENV['SENDGRID_USERNAME'], 
			:password             => ENV['SENDGRID_PASSWORD'], 
			:authentication       => :plain, 
			:domain               => ENV['SENDGRID_DOMAIN']
		}
	)
end
